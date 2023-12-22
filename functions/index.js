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

function validateValue(value) {
  return value === undefined ? '' : value;
}
// Setup Nodemailer with your SMTP provider credentials
const apiKey = functions.config().sebdgrid.api_key;
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'apikey',
    pass: apiKey // Your SendGrid API key
  }
});

exports.sendOpdNeededEmail = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Invalid HTTP method!' });
    }

    // Extract data from request bodyu
    const { LikeTo, SpecifyType,SpecifyRegion,Country,District,GovernateOrState,LivableArea,PriceRangeMax,BedRoomsMin, BathRoomsMin, DesiredFloor, NumberOfSalons,
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
    OtherHomeFeaturesInterior,honeypot } = req.body;

    if (honeypot) {
      console.log('Bot detected');
      // Handle as bot submission, like ignoring the request
      return res.status(400).json({ status: 'error', message: 'Bot detected' });
    }
    //validate fields


    // save to db
     // Add data to Firestore (optional)
     db.collection("opd-needed-form").add({
      LikeTo: validateValue(LikeTo), 
      SpecifyType: validateValue(SpecifyType),
      SpecifyRegion: validateValue(SpecifyRegion),
      Country: validateValue(Country),
      District: validateValue(District),
      GovernateOrState: validateValue(GovernateOrState),
      LivableArea: validateValue(LivableArea),
      PriceRangeMax: validateValue(PriceRangeMax),
      BedRoomsMin: validateValue(BedRoomsMin), 
      BathRoomsMin: validateValue(BathRoomsMin), 
      DesiredFloor: validateValue(DesiredFloor), 
      NumberOfSalons: validateValue(NumberOfSalons),
      NumberOfLivingRooms: validateValue(NumberOfLivingRooms),
      NumberOfBathrooms: validateValue(NumberOfBathrooms),
      NumberOfDiningRooms: validateValue(NumberOfDiningRooms),
      MaidRoomWithBathroom: validateValue(MaidRoomWithBathroom),
      StorageRoom: validateValue(StorageRoom),
      WaterWell: validateValue(WaterWell),
      Generator: validateValue(Generator),
      NumberOfParkingLots: validateValue(NumberOfParkingLots),
      OtherHomeSize: validateValue(OtherHomeSize),
      CloseToWork: validateValue(CloseToWork),
      CloseToSchool: validateValue(CloseToSchool),
      CloseToHospital: validateValue(CloseToHospital),
      CloseToSupermarket: validateValue(CloseToSupermarket),
      CloseToParksRecreation: validateValue(CloseToParksRecreation),
      CloseToRestaurants: validateValue(CloseToRestaurants),
      CloseToHighways: validateValue(CloseToHighways),
      PublicTransportation: validateValue(PublicTransportation),
      OtherLocation: validateValue(OtherLocation),
      NoTraffic: validateValue(NoTraffic),
      VeryQuiet: validateValue(VeryQuiet),
      YoungerNeighbors: validateValue(YoungerNeighbors),
      OlderNeighbors: validateValue(OlderNeighbors),
      ChildFriendly: validateValue(ChildFriendly),
      OtherNeighborhood: validateValue(OtherNeighborhood),
      CloseToHome: validateValue(CloseToHome),
      GoodReputation: validateValue(GoodReputation),
      SmallClassSize: validateValue(SmallClassSize),
      SolidCurriculum: validateValue(SolidCurriculum),
      OtherSchools: validateValue(OtherSchools),
      CentralAC: validateValue(CentralAC),
      WoodStove: validateValue(WoodStove),
      Fireplace: validateValue(Fireplace),
      TanklessWaterHeater: validateValue(TanklessWaterHeater),
      CopperPlumbing: validateValue(CopperPlumbing),
      SolarPower: validateValue(SolarPower),
      SecuritySystem: validateValue(SecuritySystem),
      HomeAutomation: validateValue(HomeAutomation),
      Cable: validateValue(Cable),
      SatelliteDish: validateValue(SatelliteDish),
      FiberOpticCable: validateValue(FiberOpticCable),
      OtherHomeSystems: validateValue(OtherHomeSystems),
      Garage: validateValue(Garage),
      WalkOutBasement: validateValue(WalkOutBasement),
      Driveway: validateValue(Driveway),
      FencedYard: validateValue(FencedYard),
      Gardens: validateValue(Gardens),
      Pool: validateValue(Pool),
      OtherHomeFeaturesExterior: validateValue(OtherHomeFeaturesExterior),
      WoodFlooring: validateValue(WoodFlooring),
      MaidRoom: validateValue(MaidRoom),
      LaundryRoom: validateValue(LaundryRoom),
      FinishedBasement: validateValue(FinishedBasement),
      EatInKitchen: validateValue(EatInKitchen),
      GameRoom: validateValue(GameRoom),
      Office: validateValue(Office),
      MasterBedroom: validateValue(MasterBedroom),
      MasterBathroom: validateValue(MasterBathroom),
      WalkInCloset: validateValue(WalkInCloset),
      OtherHomeFeaturesInterior: validateValue(OtherHomeFeaturesInterior)
      // Add more fields as required
    });
     


    const html = `<div style="width:600px; height: 800px; font-family: Tahoma, 'Lucida Grande', 'Lucida Sans', Helvetica, Arial, sans-serif;">

<div style="background: rgba(17, 88, 123, 1); color: rgba(255, 255, 255, 0.85); height:100px;">
  <div style="width:48%; float:left; margin: 20px 0px 0px 10px;" >
    <img style="float: left; padding-left:20px; width:60px;" src="https://opd-needed-azh0t1cfm-prosolutions.vercel.app/favicon-32x32.png" />
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
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">${validateValue(LikeTo)}</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(SpecifyType)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Region</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(SpecifyRegion)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Country</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Country)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">District</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(District)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Governate or state</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(GovernateOrState)}</td>
      </tr>
    </table>
    
    <h3 style="font-weight: 500; letter-spacing: 0.9px;">Home Size</h3>
    
    <table style="color:#444;">
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Livable Area</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(LivableArea)}</td>
          </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Price Range (Maximum)</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(PriceRangeMax)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Bedrooms (min.)</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(BedRoomsMin)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Bathrooms (min.)</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(BathRoomsMin)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Desired floor</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(DesiredFloor)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Number of salons</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(NumberOfSalons)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Number of living rooms</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(NumberOfLivingRooms)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
      <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Number of dining rooms</td>
      <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(NumberOfDiningRooms)}</td>
    </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Maid's room with bathroom</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(MaidRoomWithBathroom)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Storage room</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(StorageRoom)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Water well</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(WaterWell)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Generator</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Generator)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Number of parking lots</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(NumberOfParkingLots)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Other</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(OtherHomeSize)}</td>
      </tr>
    </table>
    
    <h3 style="font-weight: 500; letter-spacing: 0.9px;">Location</h3>
    
    <table style="color:#444;">
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Close to Work</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CloseToWork)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Close to School</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CloseToSchool)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
      <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Close to Hospital</td>
      <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CloseToHospital)}</td>
    </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Close to Supermarket</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CloseToSupermarket)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Close to Parks/Recreation</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CloseToParksRecreation)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Close to Restaurants</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CloseToRestaurants)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Close to Highways</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CloseToHighways)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Public Transportation</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(PublicTransportation)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Other</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(OtherLocation)}</td>
      </tr>
      
    </table>
    
    <h3 style="font-weight: 500; letter-spacing: 0.9px;">Neighborhood</h3>
    
    <table style="color:#444;">
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">No Traffic</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(NoTraffic)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Very Quiet</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(VeryQuiet)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Younger Neighbors</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(YoungerNeighbors)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Older Neighbors</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(OlderNeighbors)}</td>
      </tr>
      
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Child-Friendly</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(ChildFriendly)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Other</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(OtherNeighborhood)}</td>
      </tr>
      
    </table>

    <h3 style="font-weight: 500; letter-spacing: 0.9px;">Schools</h3>
    
    <table style="color:#444;">
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Close to Home</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CloseToHome)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Good Reputation</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(GoodReputation)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Small Class Size</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(SmallClassSize)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Solid Curriculum</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(SolidCurriculum)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Other</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(OtherSchools)}</td>
      </tr>
      
    </table>

    <h3 style="font-weight: 500; letter-spacing: 0.9px;">Home Systems</h3>
    
    <table style="color:#444;">
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Central A/C</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CentralAC)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Wood Stove</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(WoodStove)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
      <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Fireplace</td>
      <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Fireplace)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Tankless Water Heater</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(TanklessWaterHeater)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Copper Plumbing</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CopperPlumbing)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Solar Power</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(SolarPower)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Generator</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Generator)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Security System</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(SecuritySystem)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Home Automation</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(HomeAutomation)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Cable</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Cable)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Satellite Dish</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(SatelliteDish)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Fiber Optic Cable</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(FiberOpticCable)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Other</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(OtherHomeSystems)}</td>
      </tr>
      
    </table>


    <h3 style="font-weight: 500; letter-spacing: 0.9px;">Home Features - Exterior</h3>
    
    <table style="color:#444;">
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Garage</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Garage)}</td>
        </tr>
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Walk-Out Basement</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(WalkOutBasement)}</td>
        </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Driveway</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Driveway)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Fenced Yard</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(FencedYard)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Gardens</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Gardens)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Pool</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Pool)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Other</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(OtherHomeFeaturesExterior)}</td>
      </tr>
      
    </table>


    <h3 style="font-weight: 500; letter-spacing: 0.9px;">Home Features - Interior</h3>
    
    <table style="color:#444;">
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Wood Flooring</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(WoodFlooring)}</td>
        </tr>
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Maid Room</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(MaidRoom)}</td>
        </tr>
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Laundry Room</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(LaundryRoom)}</td>
        </tr>
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Finished Basement</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(FinishedBasement)}</td>
        </tr>
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Eat-In Kitchen</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(EatInKitchen)}</td>
        </tr>
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Game Room</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(GameRoom)}</td>
          </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Office</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Office)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Master Bedroom</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(MasterBedroom)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Master Bathroom</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(MasterBathroom)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Walk-In Closet</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(WalkInCloset)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Other</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(OtherHomeFeaturesInterior)}</td>
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

    // Set up email content
    const mailOptions = {
      from: 'info@wmvp.dev',
      to: 'fnzahhar@gmail.com,info@wmvp.dev,info@propertypro.vip',
      subject: `OPD Needed Form Submission`,
      text: '',
      html: html // Include your HTML content
    };   

    // Send email
    return transporter.sendMail(mailOptions)
      .then(() => res.status(200).send({ status: 'Successs', message: 'Email Sent' }))
      .catch(error => {
        console.error('Error sending email:', error);
        return res.status(500).send({ status: 'error',message: `Error sending email: ${error.message}` });
      });
  });
});
