/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();


// Setup Nodemailer with your SMTP provider credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'apikey',
    pass: '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' // Your SendGrid API key
  }
});

exports.sendOpdNeededEmail = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Invalid HTTP method!' });
    }

    // Extract data from request bodyu
    const { LikeTo, SpecifyType,SpecifyRegion,Country,District,GovernateOrState,LivableArea,PriceRangeMax,BedRoomsMin, BathRoomsMin, DesiredFloor, NmberOfSalons,
    NumberOfLivingRooms,
    NumberOfBathrooms,
    NumberOfDiningRooms,
    MaidRoomWithBathroom,
    StorageRoom,
    WaterWell,
    Generator,
    NumberOfParkingLots,
    OtherHomeSize,
    CloseToWork,
    CloseToSchool,
    CloseToHospital,
    CloseToSupermarket,
    CloseToParksRecreation,
    CloseToRestaurants,
    CloseToHighways,
    PublicTransportation,
    OtherLocation,
    NoTraffic,
    VeryQuiet,
    YoungerNeighbors,
    OlderNeighbors,
    ChildFriendly,
    OtherNeighborhood,
    CloseToHome,
    GoodReputation,
    SmallClassSize,
    SolidCurriculum,
    OtherSchools,
    CentralAC,
    WoodStove,
    Fireplace,
    TanklessWaterHeater,
    CopperPlumbing,
    SolarPower,
    SecuritySystem,
    HomeAutomation,
    Cable,
    SatelliteDish,
    FiberOpticCable,
    OtherHomeSystems,
    Garage,
    WalkOutBasement,
    Driveway,
    FencedYard,
    Gardens,
    Pool,
    OtherHomeFeaturesExterior,
    WoodFlooring,
    MaidRoom,
    LaundryRoom,
    FinishedBasement,
    EatInKitchen,
    GameRoom,
    Office,
    MasterBedroom,
    MasterBathroom,
    WalkInCloset,
    OtherHomeFeaturesInterior } = req.body;


    /*const html = `<div style="width:600px; height: 800px; font-family: Tahoma, 'Lucida Grande', 'Lucida Sans', Helvetica, Arial, sans-serif;">

<div style="background: rgba(17, 88, 123, 1); color: rgba(255, 255, 255, 0.85); height:100px;">
  <div style="width:48%; float:left; margin: 20px 0px 0px 10px;" >
    <img style="float: left; padding-left:20px; width:60px;" src="propertypro.svg" />
    <!-- <h1 style="margin-top:10px;margin-left:10px;font-size: 30px;font-family: Arial;">Property Pro</h1> -->
  </div>
  
  <div style="width:50%; float: right; ">
    <!--<div style="font-size: 18px; font-weight:300; margin:30px 30px 0px; padding-left:20px;">Needed
    </div> -->
  </div>
</div>

<div style="padding: 10px; color: rgba(255, 255, 255, 0.75); background-color:#e6e6e6;">
  <div style="background-color: #fff; color:#444; padding:20px 40px; font-weight: 400; font-size:15px; text-align:justify;">
    <h3 style="font-weight: 500; letter-spacing: 0.9px;">I would like to:</h3>
    
    <table style="color:#444;">
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">${LikeTo}</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${SpecifyType}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Region</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${SpecifyRegion}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Country</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${country}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">District</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${District}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Governate or state</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${GovernateOrState}</td>
      </tr>
    </table>
    
    <h3 style="font-weight: 500; letter-spacing: 0.9px;">Home Size</h3>
    
    <table style="color:#444;">
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Livable Area</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${LivableArea}</td>
          </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Price Range (Maximum)</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${PriceRangeMax}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Bedrooms (min.)</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${BedRoomsMin}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Bathrooms (min.)</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${BathRoomsMin}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Desired floor</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${DesiredFloor}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Number of salons</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${NumberOfSalons}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Number of living rooms</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${NumberOfLivingRooms}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Maid's room with bathroom</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${MaidRoomWithBathroom}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Storage room</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${StorageRoom}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Water well</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${WaterWell}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Generator</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${Generator}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Number of parking lots</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${NumberOfParkingLots}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Other</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${OtherHomeSize}</td>
      </tr>
    </table>
    
    <h3 style="font-weight: 500; letter-spacing: 0.9px;">Location</h3>
    
    <table style="color:#444;">
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Close to Work</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${CloseToWork}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Close to School</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${CloseToSchool}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Close to Supermarket</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${CloseToSupermarket}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Close to Parks/Recreation</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${CloseToParksRecreation}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Close to Restaurants</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${CloseToRestaurants}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Close to Highways</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${CloseToHighways}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Public Transportation</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${PublicTransportation}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Other</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${OtherLocation}/td>
      </tr>
      
    </table>
    
    <h3 style="font-weight: 500; letter-spacing: 0.9px;">Neighborhood</h3>
    
    <table style="color:#444;">
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">No Traffic</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${NoTraffic}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Very Quiet</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${VeryQuiet}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Younger Neighbors</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${YoungerNeighbors}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Older Neighbors</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${OlderNeighbors}</td>
      </tr>
      
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Child-Friendly</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${ChildFriendly}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Other</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${OtherNeighborhood}</td>
      </tr>
      
    </table>

    <h3 style="font-weight: 500; letter-spacing: 0.9px;">Schools</h3>
    
    <table style="color:#444;">
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Close to Home</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${CloseToHome}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Good Reputation</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${GoodReputation}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Small Class Size</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${SmallClassSize}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Solid Curriculum</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${SolidCurriculum}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Other</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${OtherSchools}</td>
      </tr>
      
    </table>

    <h3 style="font-weight: 500; letter-spacing: 0.9px;">Home Systems</h3>
    
    <table style="color:#444;">
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Central A/C</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${CentralAC}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Wood Stove</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${WoodStove}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Tankless Water Heater</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${TanklessWaterHeater}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Copper Plumbing</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${CopperPlumbing}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Solar Power</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${SolarPower}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Generator</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${Generator}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Security System</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${SecuritySystem}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Home Automation</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${HomeAutomation}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Cable</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${Cable}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Satellite Dish</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${SatelliteDish}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Fiber Optic Cable</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${FiberOpticCable}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Other</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${OtherHomeSystems}</td>
      </tr>
      
    </table>


    <h3 style="font-weight: 500; letter-spacing: 0.9px;">Home Features - Exterior</h3>
    
    <table style="color:#444;">
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Garage</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${Garage}</td>
        </tr>
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Walk-Out Basement</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${WalkOutBasement}</td>
        </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Driveway</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${Driveway}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Fenced Yard</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${FencedYard}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Gardens</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${Gardens}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Pool</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${Pool}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Other</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${OtherHomeFeaturesExterior}</td>
      </tr>
      
    </table>


    <h3 style="font-weight: 500; letter-spacing: 0.9px;">Home Features - Interior</h3>
    
    <table style="color:#444;">
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Wood Flooring</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${WoodFlooring}</td>
        </tr>
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Maid Room</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${MaidRoom}</td>
        </tr>
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Laundry Room</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${LaundryRoom}</td>
        </tr>
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Finished Basement</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${FinishedBasement}</td>
        </tr>
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Eat-In Kitchen</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${EatInKitchen}</td>
        </tr>
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Game Room</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${GameRoom}</td>
          </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Office</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${Office}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Master Bedroom</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${MasterBedroom}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Master Bathroom</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${MasterBathroom}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Walk-In Closet</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${WalkInCloset}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Other</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${OtherHomeFeaturesInterior}</td>
      </tr>
      
    </table>
  <!--  <center>
        <div style="width:60%;">
      <a href="http://winspiremagazine.com/Winspire_Website/refer-friend.jsp" style="text-decoration: none;"><p style="background-color:rgb(242, 18, 44); color:#fff; padding:15px;letter-spacing:1.5px;">REFER YOUR FRIEND.</p></a>
        </div>
          </center> -->
  </div>
     
</div>

<div style="padding: 10px 15px; background-color: rgba(17, 88, 123, 1); color: rgba(255, 255, 255, 0.75); height:100px; position: relative; ">
  
  <div style="width:35%; height: 100px; float: left; font-size:10px; margin-right:10px;">
    
    <h3 style="font-size: 14px;">Shanay</h3>
    Phone: <a href="tel:+9613948739" style="color:#fff">+961 3 948 739</a><br/>
    
    Email: <a href="mailto:info@propertydeals.com" style="color:#fff">info@propertydeals.com</a><br/>
    
    Address: SHANAY 1502, LEBANON, MAIN STREET, ANDALUSIA BUILDING, SECOND FLOOR

  </div>
  
  <div style="width:35%; height: 100px; float: left; font-size:10px; margin-left:10px; margin-top:-1.5px;">
    
    <h3 style="font-size: 14px;">Deir Qoubil</h3>
    Phone:<a href="tel:+9613948739" style="color:#fff">+961 3 948 739</a><br/>
    
    Email: <a href="mailto:info@propertydeals.com" style="color:#fff">info@propertydeals.com</a><br/>
    
    Address: Deir Kobel, Wadi Bchamoun Al-Ghoutani Building, second floor

  </div>
  
  
</div>
</div>`;
*/
    // Add data to Firestore (optional)
    /*db.collection("opd-needed-form").add({
      LikeTo, SpecifyType,SpecifyRegion,Country,District,GovernateOrState,LivableArea,PriceRangeMax,BedRoomsMin, BathRoomsMin, DesiredFloor, NumberOfSalons,
    NumberOfLivingRooms,
    NumberOfBathrooms,
    NumberOfDiningRooms,
    MaidRoomWithBathroom,
    StorageRoom,
    WaterWell,
    Generator,
    NumberOfParkingLots,
    OtherHomeSize,
    CloseToWork,
    CloseToSchool,
    CloseToHospital,
    CloseToSupermarket,
    CloseToParksRecreation,
    CloseToRestaurants,
    CloseToHighways,
    PublicTransportation,
    OtherLocation,
    NoTraffic,
    VeryQuiet,
    YoungerNeighbors,
    OlderNeighbors,
    ChildFriendly,
    OtherNeighborhood,
    CloseToHome,
    GoodReputation,
    SmallClassSize,
    SolidCurriculum,
    OtherSchools,
    CentralAC,
    WoodStove,
    Fireplace,
    TanklessWaterHeater,
    CopperPlumbing,
    SolarPower,
    SecuritySystem,
    HomeAutomation,
    Cable,
    SatelliteDish,
    FiberOpticCable,
    OtherHomeSystems,
    Garage,
    WalkOutBasement,
    Driveway,
    FencedYard,
    Gardens,
    Pool,
    OtherHomeFeaturesExterior,
    WoodFlooring,
    MaidRoom,
    LaundryRoom,
    FinishedBasement,
    EatInKitchen,
    GameRoom,
    Office,
    MasterBedroom,
    MasterBathroom,
    WalkInCloset,
    OtherHomeFeaturesInterior
      // Add more fields as required
    });
     */
    // Set up email content
    const mailOptions = {
      from: 'info@wmvp.dev',
      to: 'fnzahhar@gmail.com',
      subject: `OPD Needed from PostMan Test`,
      text: '',
      html: 'test',//html // Include your HTML content
    };

    // Send email
    return transporter.sendMail(mailOptions)
      .then(() => res.status(200).send({ success: 'Email sent!' }))
      .catch(error => {
        console.error('Error sending email:', error);
        return res.status(500).send({ error: `Error sending email: ${error.message}` });
      });
  });
});
