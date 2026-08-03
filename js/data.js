
const VENDORS = [
  {id:1,name:"Jays Gadgets Jos",handle:"@jaysgadgets_jos",phone:"0803 123 4567",website:"https://jaysgadgets.example.com",category:"Electronics",status:"Verified",score:92,location:"Jos, Plateau",checks:["HTTPS Secure","CAC Verified","Secure Payment","Quiz Passed"],joined:"2024-03-12"},
  {id:2,name:"Mama's Fabrics NG",handle:"@mamasfabrics_ng",phone:"0906 777 1122",website:"",category:"Fashion",status:"Verified",score:88,location:"Jos",checks:["Instagram Active 3yrs","Customer Reviews","Quiz Passed"],joined:"2024-06-20"},
  {id:3,name:"Plateau Fresh Farms",handle:"@plateaufresh",phone:"0810 445 9001",website:"https://plateaufresh.example.com",category:"Food & Agro",status:"Pending",score:61,location:"Jos",checks:["HTTPS Secure"],joined:"2025-01-15"},
  {id:4,name:"CryptoPay Vendor - Sam",handle:"@sam_cryptopay",phone:"0703 000 9999",website:"http://samcryptopay.freehost.com",category:"Crypto",status:"Risky",score:28,location:"Unknown",checks:[],joined:"2025-11-02"},
  {id:5,name:"Luxe Kicks NG",handle:"@luxekicksng",phone:"0809 334 5566",website:"https://luxekicksng.example.com",category:"Fashion",status:"Verified",score:95,location:"Lagos / Jos Delivery",checks:["HTTPS Secure","CAC Verified","Secure Payment","2FA Enabled","Quiz Passed"],joined:"2023-11-10"},
  {id:6,name:"SafeTech Repairs",handle:"@safetech_repairs",phone:"0813 222 3344",website:"",category:"Services",status:"Verified",score:84,location:"Jos",checks:["Physical Shop Verified","Quiz Passed"],joined:"2024-09-01"}
];

const QUIZ = [
  {q:"A buyer sends you a screenshot of 'bank debit alert' but you didn't receive money. What do you do?",opts:["Release goods, screenshot is proof","Wait and confirm via your bank app/USSD, not screenshot","Ask them to send another screenshot"],ans:1,explain:"Fake alerts are common. Always confirm in your own bank app."},
  {q:"Which payment method is SAFEST for customers?",opts:["Pay to personal account with no receipt","Pay on delivery or escrow / protected transfer","Send crypto to random wallet"],ans:1,explain:"Escrow or Pay on Delivery protects both sides."},
  {q:"A customer says 'I will pay 200k extra, send me 150k back'. This is:",opts:["A blessing","A classic overpayment scam","Normal business"],ans:1,explain:"Overpayment + refund request is a top scam pattern."},
  {q:"Best way to secure your vendor Instagram?",opts:["Simple password 1234","Strong password + 2FA + login alerts","Share password with assistant"],ans:1,explain:"2FA stops 90% of account hijacks."},
  {q:"Customer wants to verify you. What should you willingly provide?",opts:["Your ATM PIN","Your business CAC, location, real reviews, secure link","Nothing, tell them to trust you"],ans:1,explain:"Transparency builds trust. Never share PIN."},
  {q:"Your website URL starts with http:// not https://, what does it mean?",opts:["It's more secure","It's NOT encrypted, risky for payments","It means it's faster"],ans:1,explain:"HTTPS encrypts data. No HTTPS = risky."},
  {q:"Someone reports your shop for scam. Best response?",opts:["Insult them and block","Provide evidence, resolve publicly, contact TrustVerify","Delete account"],ans:1,explain:"Professional resolution builds long-term trust."}
];
