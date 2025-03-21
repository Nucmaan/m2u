
const mongoose = require("mongoose");

const listingsSchema = new mongoose.Schema(
    {
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      title: {
        type: String,
        required: [true, "title is required"],
        trim: true,
      },
      city: {
        type: String,
        required: [true, "city is required"],
      },
      address: {
        type: String,
        required: [true, "address is required"],
      },
      price: {
        type: Number,
        required: [true, "price is required"],
      },
      bedrooms: {
        type: Number,
        default: 1,
      },
      bathrooms: {
        type: Number,
        default: 1,
      },
      houseType: {
        type: String,
        enum: ["Rent", "Buy"],
        default: "Rent",
      },
      
      status: {
        type: String,
        enum: ["Available", "Sold", "Rented"],
        default: "Available",
      },
      
      deposit: {
        type: Number,
        default: 0,
      },
      description: {
        type: String,
        trim: true,
      },
      images: {
        type: [String],  
        required: true,
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

  listingsSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    try {
      console.log(`Deleting related records for property: ${this._id}`);
  
       await Booking.deleteMany({ listing: this._id });
  
       await Contract.deleteMany({ property: this._id });
  
       await Bill.deleteMany({ property: this._id });
  
      console.log("Related records deleted successfully.");
      next();
    } catch (error) {
      next(error);
    }
  });
  
  const Listings = mongoose.models.Listings || mongoose.model("Listings", listingsSchema);
  
  export default Listings;
  