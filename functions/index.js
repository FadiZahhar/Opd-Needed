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
    const { 
    FirstName,
    LastName,
    Email,
    PhoneNumber,
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
      FirstName: validateValue(FirstName),
      LastName: validateValue(LastName), 
      Email: validateValue(Email), 
      PhoneNumber: validateValue(PhoneNumber), 
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
     


    const html = `<div style="width:600px; height: 800px;margin:0 auto;font-family: Tahoma, 'Lucida Grande', 'Lucida Sans', Helvetica, Arial, sans-serif;">

<div style="background: rgba(17, 88, 123, 1); color: rgba(255, 255, 255, 0.85); height:100px;">
  <div style="width:48%; float:left; margin: 20px 0px 0px 10px;" >
    <img style="float: left; padding-left:20px; width:60px;" src="https://needed.propertypro.vip/propertypro.png" />
    <h1 style="margin-top:10px;margin-left:10px;font-size: 30px;font-family: Arial;">&nbsp;DOT VIP</h1>
  </div>
  
  <div style="width:50%; float: right; ">
    <!--<div style="font-size: 18px; font-weight:300; margin:30px 30px 0px; padding-left:20px;">Needed
    </div> -->
  </div>
</div>

<div style="padding: 10px; color: rgba(255, 255, 255, 0.75); background-color:#e6e6e6;">
  <div style="background-color: #fff; color:#444; padding:20px 40px; font-weight: 400; font-size:15px; text-align:justify;">
   
    
    <table style="color:#444;">
    
    <tr style="border: 1px solid #b2b2b2;">
    <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">First Name</td>
    <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(FirstName)}</td>
    </tr>

    <tr style="border: 1px solid #b2b2b2;">
    <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Last Name</td>
    <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(LastName)}</td>
    </tr>

    <tr style="border: 1px solid #b2b2b2;">
    <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Email</td>
    <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Email)}</td>
    </tr>

    <tr style="border: 1px solid #b2b2b2;">
    <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">Phone Number</td>
    <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(PhoneNumber)}</td>
    </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">I would like to: ${validateValue(LikeTo)}</td>
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
      subject: `OPD My Home Key Submission`,
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

exports.sendOpdNeededEmailAr = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Invalid HTTP method!' });
    }

    // Extract data from request bodyu
    const { 
    FirstName,
    LastName,
    Email,
    PhoneNumber,
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
      FirstName: validateValue(FirstName),
      LastName: validateValue(LastName), 
      Email: validateValue(Email), 
      PhoneNumber: validateValue(PhoneNumber), 
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
     


    const html = `<div style="width:600px; height: 800px;margin:0 auto;font-family: Tahoma, 'Lucida Grande', 'Lucida Sans', Helvetica, Arial, sans-serif; direction:rtl;">

<div style="background: rgba(17, 88, 123, 1); color: rgba(255, 255, 255, 0.85); height:100px;">
  <div style="width:48%; float:left; margin: 20px 0px 0px 10px;" >
    <img style="float: left; padding-left:20px; width:60px;" src="https://needed.propertypro.vip/propertypro.png" />
    <h1 style="margin-top:10px;margin-left:10px;font-size: 30px;font-family: Arial;">&nbsp;DOT VIP</h1>
  </div>
  
  <div style="width:50%; float: right; ">
    <!--<div style="font-size: 18px; font-weight:300; margin:30px 30px 0px; padding-left:20px;">Needed
    </div> -->
  </div>
</div>

<div style="padding: 10px; color: rgba(255, 255, 255, 0.75); background-color:#e6e6e6;">
  <div style="background-color: #fff; color:#444; padding:20px 40px; font-weight: 400; font-size:15px; text-align:justify;">
   
    
    <table style="color:#444;">
    
    <tr style="border: 1px solid #b2b2b2;">
    <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">الاسم الأول</td>
    <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(FirstName)}</td>
    </tr>

    <tr style="border: 1px solid #b2b2b2;">
    <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">اسم العائلة</td>
    <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(LastName)}</td>
    </tr>

    <tr style="border: 1px solid #b2b2b2;">
    <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">بريد إلكتروني</td>
    <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Email)}</td>
    </tr>

    <tr style="border: 1px solid #b2b2b2;">
    <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">رقم الهاتف</td>
    <td style="background-color: #fff;padding: 6px;width: 240px;direction:ltr">${validateValue(PhoneNumber)}</td>
    </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">أود: ${validateValue(LikeTo)}</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(SpecifyType)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">منطقة</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(SpecifyRegion)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">البلد</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Country)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">المدينة، القرية</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(District)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">المحافظة أو الولاية</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(GovernateOrState)}</td>
      </tr>
    </table>
    
    <h3 style="font-weight: 500; letter-spacing: 0.9px;">حجم المنزل</h3>
    
    <table style="color:#444;">
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">غرف المعيشة</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(LivableArea)}</td>
          </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">نطاق السعر (الحد الأقصى)</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(PriceRangeMax)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">غرف النوم (الحد الأدنى)</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(BedRoomsMin)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">الحمامات (الحد الأدنى)</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(BathRoomsMin)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">الأرضية المرغوبة</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(DesiredFloor)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">عدد الصالونات</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(NumberOfSalons)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">عدد غرف المعيشة</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(NumberOfLivingRooms)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
      <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">عدد غرف الطعام</td>
      <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(NumberOfDiningRooms)}</td>
    </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">غرفة خادمة مع حمام</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(MaidRoomWithBathroom)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">غرفة تخزين</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(StorageRoom)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">بئر ماء</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(WaterWell)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">مولد كهرباء</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Generator)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">عدد مواقف السيارات</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(NumberOfParkingLots)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">آخر</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(OtherHomeSize)}</td>
      </tr>
    </table>
    
    <h3 style="font-weight: 500; letter-spacing: 0.9px;">لموقع</h3>
    
    <table style="color:#444;">
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">قريب من العمل</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CloseToWork)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">على مقربة من المدرسة</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CloseToSchool)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
      <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">قريب من المستشفى</td>
      <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CloseToHospital)}</td>
    </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">بالقرب من السوبر ماركت</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CloseToSupermarket)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">قريب من المتنزهات/الاستجمام</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CloseToParksRecreation)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">قريب من المطاعم</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CloseToRestaurants)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">قريب من الطرق السريعة</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CloseToHighways)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">وسائل النقل العامة</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(PublicTransportation)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">آخر</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(OtherLocation)}</td>
      </tr>
      
    </table>
    
    <h3 style="font-weight: 500; letter-spacing: 0.9px;">الحيّ</h3>
    
    <table style="color:#444;">
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">لا يوجد زحمة سير</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(NoTraffic)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">هادئة جدا</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(VeryQuiet)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">الجيران الأصغر سنا</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(YoungerNeighbors)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">الجيران الأكبر سنا</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(OlderNeighbors)}</td>
      </tr>
      
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">صديقة للطفل</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(ChildFriendly)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">آخر</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(OtherNeighborhood)}</td>
      </tr>
      
    </table>

    <h3 style="font-weight: 500; letter-spacing: 0.9px;">المدارس</h3>
    
    <table style="color:#444;">
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">قريب من المنزل</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CloseToHome)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">سمعة جيدة</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(GoodReputation)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">حجم الفصل صغير</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(SmallClassSize)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">منهج متين</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(SolidCurriculum)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">خر</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(OtherSchools)}</td>
      </tr>
      
    </table>

    <h3 style="font-weight: 500; letter-spacing: 0.9px;">ميزات المنزل - الخارج</h3>
    
    <table style="color:#444;">
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">تكييف مركزي</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CentralAC)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">موقد الخشب</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(WoodStove)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
      <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">المدفأة</td>
      <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Fireplace)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">سخان ماء بدون خزان</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(TanklessWaterHeater)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">السباكة النحاسية</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(CopperPlumbing)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">الطاقة الشمسية</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(SolarPower)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">مولد كهرباء</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Generator)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">نظام الأمن</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(SecuritySystem)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">أتمتة المنزل</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(HomeAutomation)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">كابل</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Cable)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">طبق استقبال أقمار صناعية</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(SatelliteDish)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">كابل الألياف البصرية</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(FiberOpticCable)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">آخر</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(OtherHomeSystems)}</td>
      </tr>
      
    </table>


    <h3 style="font-weight: 500; letter-spacing: 0.9px;">ميزات المنزل - الخارج</h3>
    
    <table style="color:#444;">
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">كراج</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Garage)}</td>
        </tr>
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">الطابق السفلي للخروج</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(WalkOutBasement)}</td>
        </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">طريق خاص</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Driveway)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">ساحة مسيجة</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(FencedYard)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">حدائق</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Gardens)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">حمام سباحة</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Pool)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">آخر</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(OtherHomeFeaturesExterior)}</td>
      </tr>
      
    </table>


    <h3 style="font-weight: 500; letter-spacing: 0.9px;">ميزات المنزل - الداخلية</h3>
    
    <table style="color:#444;">
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">الأرضيات الخشبية</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(WoodFlooring)}</td>
        </tr>
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">غرفة الخادمة</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(MaidRoom)}</td>
        </tr>
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">غرفة الغسيل</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(LaundryRoom)}</td>
        </tr>
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">الطابق السفلي مكتمل</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(FinishedBasement)}</td>
        </tr>
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">تناول الطعام في المطبخ</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(EatInKitchen)}</td>
        </tr>
        <tr style="border: 1px solid #b2b2b2;">
            <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">غرفة الالعاب</td>
            <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(GameRoom)}</td>
          </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">مكتب</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(Office)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">غرفة النوم الرئيسية</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(MasterBedroom)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">لحمام الرئيسي</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(MasterBathroom)}</td>
      </tr>
      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">خزانة في الحائط</td>
        <td style="background-color: #fff;padding: 6px;width: 240px;">${validateValue(WalkInCloset)}</td>
      </tr>

      <tr style="border: 1px solid #b2b2b2;">
        <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">آخر</td>
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
      subject: `OPD My Home Key Submission`,
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


exports.sendOpdNeededEmailToClient = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Invalid HTTP method!' });
    }

        // Extract data from request bodyu
        const { 
          FirstName,
          LastName,
          Email,
          honeypot } = req.body;
      
          if (honeypot) {
            console.log('Bot detected');
            // Handle as bot submission, like ignoring the request
            return res.status(400).json({ status: 'error', message: 'Bot detected' });
          }

    const html=`<div style="width:600px; height: 800px;margin:0 auto; font-family: Tahoma, 'Lucida Grande', 'Lucida Sans', Helvetica, Arial, sans-serif;">

    <div style="background: rgba(17, 88, 123, 1); color: rgba(255, 255, 255, 0.85); height:100px;">
      <div style="width:48%; float:left; margin: 20px 0px 0px 10px;" >
        <img style="float: left; padding-left:20px; width:60px;" src="https://needed.propertypro.vip/propertypro.png" />
        <h1 style="margin-top:10px;margin-left:10px;font-size: 30px;font-family: Arial;">&nbsp;DOT VIP</h1>
      </div>
      
      <div style="width:50%; float: right; ">
        <!--<div style="font-size: 18px; font-weight:300; margin:30px 30px 0px; padding-left:20px;">Needed
        </div> -->
      </div>
    </div>
    
    <div style="padding: 10px; color: rgba(255, 255, 255, 0.75); background-color:#e6e6e6;">
      <div style="background-color: #fff; color:#444; padding:20px 40px; font-weight: 400; font-size:15px; text-align:justify;">
        <h3 style="font-weight: 500; letter-spacing: 0.9px;">Dear ${FirstName} ${LastName}</h3>
        <p>We hope this email finds you fine.<br/><br/>
          Thank you for contacting DOT VIP Team!<br/><br/>
          Your demands have been well received; an agent will get in touch with you <br/>
          during our work / Duty hours 9 am to 5 pm - Monday to Friday. <br/>
          Saturday and Sunday our office is closed.<br/><br/>
          Best regards<br/>
          Muhammad Itani<br/>
          Founder and CEO of https://propertypro.vip/<br/>
          Email: <a href="info@propertypro.vip" target="_blank">info@propertypro.vip</a><br/>
          Phone Number: <a href="tel:0096103948739">00961 03 948739</a></p>


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
        to: `${Email}`,
        subject: `OPD My Home Key Submission`,
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

exports.sendOpdNeededEmailToClientAr = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Invalid HTTP method!' });
    }

        // Extract data from request bodyu
        const { 
          FirstName,
          LastName,
          Email,
          honeypot } = req.body;
      
          if (honeypot) {
            console.log('Bot detected');
            // Handle as bot submission, like ignoring the request
            return res.status(400).json({ status: 'error', message: 'Bot detected' });
          }

    const html=`<div style="width:600px; height: 800px;margin:0 auto; font-family: Tahoma, 'Lucida Grande', 'Lucida Sans', Helvetica, Arial, sans-serif;direction:rtl">

    <div style="background: rgba(17, 88, 123, 1); color: rgba(255, 255, 255, 0.85); height:100px;">
      <div style="width:48%; float:left; margin: 20px 0px 0px 10px;" >
        <img style="float: left; padding-left:20px; width:60px;" src="https://needed.propertypro.vip/propertypro.png" />
        <h1 style="margin-top:10px;margin-left:10px;font-size: 30px;font-family: Arial;">&nbsp;DOT VIP</h1>
      </div>
      
      <div style="width:50%; float: right; ">
        <!--<div style="font-size: 18px; font-weight:300; margin:30px 30px 0px; padding-left:20px;">Needed
        </div> -->
      </div>
    </div>
    
    <div style="padding: 10px; color: rgba(255, 255, 255, 0.75); background-color:#e6e6e6;">
      <div style="background-color: #fff; color:#444; padding:20px 40px; font-weight: 400; font-size:15px; text-align:justify;">
        <h3 style="font-weight: 500; letter-spacing: 0.9px;">${FirstName} ${LastName} حضرة عميلنا العزيز،</h3>
        <p>تحية طيبة وبعد،<br/><br/>
          نأمل أن يجدك ردنا هذا على ما يرام.<br/><br/>
          شكرًا لتواصلكم مع فريق DOT VIP! <br/>
          لقد تم استلام مطالبكم بشكل جيد؛ . <br/>
          وسيتواصل معكم فريق العمل أثناء دوامنا/ ساعات العمل من 9 صباحًا إلى 5 مساءً <br/>
          - من الاثنين إلى الجمعة. السبت والأحد مكتبنا مغلق <br/>
          أطيب التحيات.<br/>
          محمد عيتاني<br/>
          المؤسس والرئيس التنفيذي لشركة https://propertypro.vip/<br/>
          البريد الإلكتروني: <a href="info@propertypro.vip" target="_blank">info@propertypro.vip</a><br/>
          رقم الهاتف: <a href="tel:0096103948739">00961 03 948739</a></p>


      </div>
         
    </div>
    
    <div style="padding: 10px 15px; background-color: rgba(17, 88, 123, 1); color: rgba(255, 255, 255, 0.75); height:100px; position: relative; ">
      
    <div style="width:35%; height: 100px; float: left; font-size:10px; margin-right:10px;">
        
    <h3 style="font-size: 14px;">شاناي</h3>
    رقم الهاتف:  <a href="tel:+9613948739" style="color:#fff">+961 3 948 739</a><br/>
    
    البريد الإلكتروني: <a href="mailto:info@propertydeals.com" style="color:#fff">info@propertydeals.com</a><br/>
    
    العنوان: شاناي 1502 ، لبنان ، مين ستريت ، مبنى الأندلس ، الطابق الثاني

  </div>
  
  <div style="width:35%; height: 100px; float: left; font-size:10px; margin-left:10px; margin-top:-1.5px;">
    
    <h3 style="font-size: 14px;">دير Qoubil</h3>
    هاتف:<a href="tel:+9613948739" style="color:#fff">+961 3 948 739</a><br/>
    
    بريد إلكتروني: <a href="mailto:info@propertydeals.com" style="color:#fff">info@propertydeals.com</a><br/>
    
    العنوان: دير كوبيل ، مبنى وادي بيشامون الغوتاني ، الطابق الثاني

  </div>
      
      
    </div>
  </div>`;

      // Set up email content
      const mailOptions = {
        from: 'info@wmvp.dev',
        to: `${Email}`,
        subject: `OPD My Home Key Submission`,
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