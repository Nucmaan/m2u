const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["Admin", "Agent", "User"],
      default: "User",
    },
    avatar: {
      type: String,
      default:
        "https://myhome2u-storage.s3.ap-southeast-2.amazonaws.com/myhome2uFolder/NasriDevLab.jpg",
    },
    verificationToken: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    mobile: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("remove", async function (next) {
  try {
    await mongoose.model("Booking").deleteMany({
      $or: [{ user: this._id }, { owner: this._id }],
    });

    await mongoose
      .model("Bill")
      .deleteMany({ $or: [{ user: this._id }, { owner: this._id }] });

    await mongoose
      .model("Contract")
      .deleteMany({ $or: [{ user: this._id }, { owner: this._id }] });

    await mongoose.model("Listings").deleteMany({ owner: this._id });

    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
