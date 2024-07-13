const Address =require('../models/addressModel')
const mongoose = require('mongoose');

const sanitizeId = (id) => {
  return id
 };



const checkoutaddressadd =async (req, res) => {
  
  try {

    const id=  req.body.id;
    const type =req.body.type
    const houseName = req.body.houseName
    const localArea =req.body.localArea
    const postoffice =req.body.po
    const district =req.body.district
    const pin =req.body.pin
    
    if (id && houseName && localArea && district && pin&&postoffice&&type) {
      const addressData = await Address.findOne({ userId: id });
    
      if (addressData) {
        addressData.addresses.push({
         type:type,
         housename:houseName,
         localarea:localArea,
         postoffice:postoffice,
         district:district,
         pin:pin
        });
        const savedAddress = await addressData.save();
        if (savedAddress) {
          res.status(200).send({
            message: "Addresses added successfully",
            success: true,
          });
        } else {
          res.status(200).send({
            message: "Something went wrong",
            success: false,
          });
        }
      } else {
        const address = new Address({
          userId: id,
          addresses: [{
            type:type,
         housename:houseName,
         localarea:localArea,
         postoffice:postoffice,
         district:district,
         pin:pin
          }]
      });
      const addressData = await address.save()
        if (addressData) {
          res.status(200).send({
            message: "Addresses added successfully",
            success: true,
          });
        } else {
          res.status(200).send({
            message: "Something went wrong",
            success: false,
          });
        }
      }
    } else {
      res.status(200).send({
        message: "Invalid request data",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal server error",
      success: false,
    });
  }
};


const addressadd = async (req, res) => {
  try {
    const id =sanitizeId( req.body.id)
    const houseName =req.body.houseName
    const place = req.body.place
    const district =req.body.district
    const pin =req.body.pin

    if (id && houseName && place && district && pin) {
      const addressData = await Address.findOne({ userId: id });
      if (addressData) {
        addressData.addresses.push({
          pin: pin,
          name: houseName,
          place: place,
          district: district,
        });
        const savedAddress = await addressData.save();
        if (savedAddress) {
          res.status(200).send({
            message: "Addresses added successfully",
            success: true,
          });
        } else {
          res.status(200).send({
            message: "Something went wrong",
            success: false,
          });
        }
      } else {
        const address = new Address({
          userId: id,
          addresses: [{
              pin:pin,
              name:houseName,
              place:place,
              district:district
          }]
      });
      const addressData = await address.save()
        if (addressData) {
          res.status(200).send({
            message: "Addresses added successfully",
            success: true,
          });
        } else {
          res.status(200).send({
            message: "Something went wrong",
            success: false,
          });
        }
      }
    } else {
      res.status(200).send({
        message: "Invalid request data",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal server error",
      success: false,
    });
  }
};

const editProfileAddress = async (req,res) =>{

    try {
        const id = sanitizeId( req.body.id)
        const name = req.body.name;
        const place = req.body.place;
        const district = req.body.district;
        const pin = req.body.pin;

        let edit = false

        if (name !== "") {
         let  updatedAddress = await Address.findOneAndUpdate(
              { userId: id },
              { $set: { "addresses.0.name": name } },
              { new: true }
            );
            edit = true;
          }
          
          if (pin !== 0) {
           let  updatedAddress = await Address.findOneAndUpdate(
              { userId: id },
              { $set: { "addresses.0.pin": pin } },
              { new: true }
            );
            edit = true;
          }
          
          if (place !== "") {
          let  updatedAddress = await Address.findOneAndUpdate(
              { userId: id },
              { $set: { "addresses.0.place": place } },
              { new: true }
            );
            edit = true;
          }
          
          if (district !== "") {
          let  updatedAddress = await Address.findOneAndUpdate(
              { userId: id },
              { $set: { "addresses.0.district": district } },
              { new: true }
            );
            edit = true;
          }
        if (edit) {
          res.status(200).send({ message: "successfully updated", success: true });
        } else {
          res.status(200).send({ message: "you dont make any change", success: false });
        }
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send({ message: "Internal server error", success: false });
    }

}

const deleteAddress = async(req,res) =>{
  try {
    const  addressId= sanitizeId( req.body.addressId)
    const userId =sanitizeId( req.body.id)
    
   if( addressId){
    
    const result = await Address.updateOne(
        { userId: userId },
        { $pull: { addresses: {_id: addressId} } }
      );
     
      if(result){
        
        res.status(200).send({ success: true });
      }else{
        res
        .status(200)
        .send({ message: "something went wrong...", success: false });
      }
   }else{
    res
    .status(200)
    .send({ message: "something went wrong.", success: false });
   }
    
} catch (error) {
  console.error("An error occurred:", error);
  res.status(500).send({ message: "Internal server error", success: false });
}
}
const usercheckoutaddressedit = async(req,res) =>{
 
  try {
    console.log('hai');
    const type =req.body.type1;
    const houseName = req.body.houseName1;
    const localArea =req.body.localArea1;
    const postoffice =req.body.po1;
    const district =req.body.district1;
    const pin =req.body.pin1;

    const userId = req.body.id
    const addressId = req.body.addressId
    
    const address = await Address.findOne({
      userId: userId,
      'addresses._id': addressId
    });
    
    let edit = false

    if (type !== "") {
      const updatedAddress = await Address.findOneAndUpdate(
        {
          userId: userId,
          'addresses._id': addressId, 
        },
        {
          $set: {
            
            'addresses.$.type': type,
           
          },
        },
        { new: true }
      );
        edit = true;
      }
      
      if (houseName !== "") {
        const updatedAddress = await Address.findOneAndUpdate(
          {
            userId: userId,
            'addresses._id': addressId, 
          },
          {
            $set: {
             
              'addresses.$.housename': houseName, 
             
            },
          },
          { new: true }
        );
        edit = true;
      }
      
      if (localArea!== "") {
        const updatedAddress = await Address.findOneAndUpdate(
          {
            userId: userId,
            'addresses._id': addressId,
          },
          {
            $set: {
              
              'addresses.$.localarea': localArea,
              
            },
          },
          { new: true }
        );
        edit = true;
      }
      
      if (postoffice !== "") {
        const updatedAddress = await Address.findOneAndUpdate(
          {
            userId: userId,
            'addresses._id': addressId, // Find the document that matches userId and contains the specified addressId
          },
          {
            $set: {
             
              'addresses.$.postoffice': postoffice,
            },
          },
          { new: true }
        );
        edit = true;
      }
      if (district !== "") {
        const updatedAddress = await Address.findOneAndUpdate(
          {
            userId: userId,
            'addresses._id': addressId, // Find the document that matches userId and contains the specified addressId
          },
          {
            $set: {
             
              'addresses.$.district': district,
            },
          },
          { new: true }
        );
        edit = true;
      }
      if (pin !== "") {
        const updatedAddress = await Address.findOneAndUpdate(
          {
            userId: userId,
            'addresses._id': addressId, // Find the document that matches userId and contains the specified addressId
          },
          {
            $set: {
             
              'addresses.$.pin': pin,
            },
          },
          { new: true }
        );
        edit = true;
      }
    if (edit) {
      res.status(200).send({ message: "successfully updated", success: true });
    } else {
      res.status(200).send({ message: "you dont make any change", success: false });
    }
} catch (error) {
  console.error("An error occurred:", error);
  res.status(500).send({ message: "Internal server error", success: false });
}
}
const fetchsingleaddress = async (req,res) =>{
 
  try {

    const addressId = sanitizeId( req.body.addressId)
    const id = sanitizeId( req.body.id)
    
   console.log(addressId);
    if (addressId) {
      const address = await Address.findOne({userId:id,'addresses._id': addressId})
      console.log(address);
      if (address) {
        const specificAddress = address.addresses.find(
          (addr) => addr._id.toString() === addressId
        );
        res.status(200).send({ success: true, data: specificAddress});
      } else {
        res.status(200).send({ message: "something went worng", success: false });
      }
    } else {
      res.status(200).send({ message: "something went worng..", success: false });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
}

module.exports ={
    addressadd,
    editProfileAddress,
    deleteAddress,
    checkoutaddressadd ,
    usercheckoutaddressedit,
    fetchsingleaddress
}