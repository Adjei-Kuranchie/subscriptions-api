import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide subscription name"],
      trim: true,
      minLength: [3, "Subscription name must be at least 3 characters"],
      maxLength: [100, "Subscription name must be at most 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide subscription price"],
      min: [0, "Subscription price must be positive"],
    },
    currency: {
      type: String,
      uppercase: true,
      enum: ["USD", "EUR", "GBP", "NGN", "GHS", "CAD", "AUD", "JPY", "CNY"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      required: [true, "Please provide subscription category"],
      enum: [
        "sports",
        "entertainment",
        "education",
        "health",
        "news",
        "gaming",
        "lifestyle",
        "technology",
      ],
      default: "basic",
    },
    paymentMethod: {
      type: String,
      required: [true, "Please provide payment method"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);
//Auto calculate renewal date based on frequency
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = { daily: 1, weekly: 7, monthly: 30, yearly: 365 };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
