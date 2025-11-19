
const express = require('express');
const fs=require("fs")
const path = require('path');

const app = express();
app.use(express.json());
// app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, '../assets')));  // For welcome page
app.use(express.static(path.join(__dirname, '../authentication pages'))); // For other HTML
app.use(express.static(path.join(__dirname, '../booking and dashboard')))

// app.use('/images', express.static(path.join(__dirname, '../'))); 

let users=fs.readFileSync(path.join(__dirname, '../data store/users.txt'),"utf-8")
users=JSON.parse(users)
let u_c=(users.length==0)? 1:users.length+1
let b_c=fs.readFileSync(path.join(__dirname, '../data store/booking.txt'),"utf-8")
b_c=JSON.parse(b_c)

function checkuser(req,res,next)//check username
{
    users=fs.readFileSync(path.join(__dirname, '../data store/users.txt'),"utf-8")
    users=JSON.parse(users)
    let user=users.find(x=>{
        if(x.username==req.headers["username"] && x.password==req.headers["password"] && x.id==req.params.userId)
            return x})

    if(user!=undefined)
    {
        next()
    }
    else res.status(404).json({message:"User id does not exist/invalid credentials"})
    
}
// frontend

app.get("/welcome",(req,res)=>{
    res.sendFile(path.join(__dirname, '../booking and dashboard/welcome.html'))

})

app.get("/signup",(req,res)=>{
    res.sendFile(path.join(__dirname,'../authentication pages/signup.html'))
})

app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"../booking and dashboard/dashboard.html"))
})

app.get("/forgot",(req,res)=>{
    res.sendFile(path.join(__dirname,"../authentication pages/forgotpwd.html"))
})

app.get("/profile",(req,res)=>{
    res.sendFile(path.join(__dirname,"../booking and dashboard/profile.html"))
})

app.get("/book",(req,res)=>{
    res.sendFile(path.join(__dirname,"../booking and dashboard/book.html"))
})

app.get("/delbook",(req,res)=>{
    res.sendFile(path.join(__dirname,"../booking and dashboard/del.html"))
})

app.get("/update",(req,res)=>{
    res.sendFile(path.join(__dirname,"../booking and dashboard/update.html"))
})

app.get("/summary",(req,res)=>{
    res.sendFile(path.join(__dirname,"../booking and dashboard/summary.html"));
})

app.get("/seepwd",(req,res)=>{
    users=JSON.parse(fs.readFileSync(path.join(__dirname, '../data store/users.txt'),"utf-8"))
    let un= req.headers["username"]
    let uid= req.headers["userid"]
    let user=users.find(x=>{
        if(x.username==un && x.id==uid) return x;
    })
    let msg;
    if(user==undefined) msg={message:"not found"}
    else msg={pwd:user.password}
    res.json(msg)
})

app.get("/checkuser",(req,res)=>{
    users=JSON.parse(fs.readFileSync(path.join(__dirname, '../data store/users.txt'),"utf-8"))
    let un=req.headers["username"]
    let pwd=req.headers["password"]
    let user=users.find(x=>{
        if(x.username==un && x.password==pwd)
        {
            return x
        }
    })

    if(user==undefined)
    {
        res.json({status:false})
    }
    else res.json({status:true,uid:user.id})
})

//routes

//1
app.post('/signup', (req, res) => {
    users=JSON.parse(fs.readFileSync(path.join(__dirname, '../data store/users.txt'),"utf-8"))

    let un = req.body.username;
    let pwd = req.body.password;
    let obj={
        id:u_c,
        username:un,
        password:pwd,
        bookings:[]
    }
    let check=false
    check=users.find(x=>{
        if(x.username==un) return true;
    })
    if(check)
    {
        res.json({message:"User already exists with same username, try another."})
        return;
    }
    users.push(obj)
    fs.writeFileSync(path.join(__dirname, '../data store/users.txt'),JSON.stringify(users))
    res.status(201).json({ message: "User created successfully", userId: u_c })
    u_c++;
});
//2
app.get("/users",(req,res)=>{
    users=fs.readFileSync(path.join(__dirname, '../data store/users.txt'),"utf-8")
    users=JSON.parse(users)
    res.json(users)
})

//3. Body → { carName, days, rentPerDay }.
app.post("/bookings/:userId", checkuser,(req,res)=>{
    let uid=req.params.userId
    let cname=req.body.carName
    let day=req.body.days
    let rate=req.body.rentPerDay

    let obj={
        bookingId:b_c,
        carName:cname,
        days:day,
        rentPerDay:rate,
        status:"booked"
    }
    let user=users.find(x=>x.id==uid)
    user.bookings.push(obj);
    b_c++;
    fs.writeFileSync(path.join(__dirname, '../data store/booking.txt'),JSON.stringify(b_c))
    fs.writeFileSync(path.join(__dirname, '../data store/users.txt'),JSON.stringify(users))
    res.status(200).json({message:"Booking created successfully."})
})

//4. ### `GET /bookings/:userId` - Return all bookings of that user.

app.get("/bookings/:userId",checkuser,(req,res)=>{
    let uid=req.params.userId
    let user=users.find(x=>{if(x.id==uid)return x;})
    res.json(user.bookings)
})

//5 .GET /bookings/:userId/:bookingId

app.get("/bookings/:userId/:bookingId",checkuser,(req,res)=>{
    let uid=req.params.userId
    let bid=req.params.bookingId
    let user=users.find((x)=>{
        if(x.id==uid)
            return x
    })
    let booking=user.bookings.find(function(x){
        if(x.bookingId==bid) return x })
    if(booking!=undefined)
    {
        res.status(200).json(booking)
    }
    else res.status(404).json({message:"Booking id does not exist"})
})

//6. PUT /bookings/:userId/:bookingId
app.put("/bookings/:userId/:bookingId",checkuser,(req,res)=>{
    let uid=req.params.userId;
    let bid=Number(req.params.bookingId)
    let cname=req.body.carName
    let day=req.body.days
    let rate=req.body.rentPerDay
    let book=users.find(x=>{
        if(x.id==uid)
            return x;
    }).bookings.find(y=>{
        if(y.bookingId==bid)
        {
            y.carName=cname
            y.days=day
            y.rentPerDay=rate
            return y;
        }
    })
    if(book==undefined){
        res.status(404).json({ message: "Booking not found" })
        return;
    }

    fs.writeFileSync(path.join(__dirname, '../data store/users.txt'),JSON.stringify(users))
    res.status(200).json({
            message:"Booking updated successfully",
            bookingId:bid,
            totalCost:day*rate
        })
    return;
})

//7. PUT /bookings/:userId/:bookingId/status
app.put("/bookings/:userId/:bookingId/status",checkuser,(req,res)=>{
    let uid=req.params.userId
    let bid=req.params.bookingId
    let sts=req.body.status

    let book=users.find(x=>{
        if(x.id==uid) return x
    }).bookings.find(y=>{
        if(y.bookingId==bid)
        {
            y.status=sts;
            return y;
        }
    })
    if(book==undefined)
    {
        res.status(404).json({message:"Booking not found"})
        return;
    }
    fs.writeFileSync(path.join(__dirname, '../data store/users.txt'),JSON.stringify(users))
    res.status(200).json({ message:"Status updated successfully"})
})

//8. DELETE /bookings/:userId/:bookingId

app.delete("/bookings/:userId/:bookingId",checkuser,(req,res)=>{
    let uid=req.params.userId
    let bid=req.params.bookingId

    let b = users.find((user)=>{
        if(user.id == uid) return user;
    }).bookings.find(x=>{
        if(x.bookingId==bid)return x;
    })
    if(b==undefined)
    {
        res.status(404).json({message:"Booking not found"})
        return;
    }
    let user = users.find((user)=>{
        if(user.id == uid) return user;
    })
    user.bookings=user.bookings.filter((x)=>x.bookingId != bid )
    fs.writeFileSync(path.join(__dirname, '../data store/users.txt'),JSON.stringify(users))
    res.status(200).json({message: "Booking deleted successfully" })
})

//9. GET /summary/:userId
// {
//   userId: 1,
//   username: "rahul",
//   totalBookings: 3,
//   totalAmountSpent: 6300
// }
app.get("/summary/:userId",checkuser,(req,res)=>{
    let uid=req.params.userId
    let user=users.find(x=>{ if (x.id == uid) return x; })
    let c=0,money=0;

    for(let i of user.bookings)
    {
        if(i.status!="cancelled")
        {
            c++;
            money+=(i.rentPerDay*i.days)
        }
    }
    let obj={
        userId:uid,
        username:user.username,
        totalBookings:c,
        totalAmountSpent:money
    }
    res.status(200).json(obj)
})

//10. put profile/changepwd/:userId

app.put("/profile/changepwd/:userId",(req,res)=>{
    let uid=req.params.userId
    let un=req.headers["username"]
    let pwd=req.headers["password"]
    let npwd=req.headers["newpassword"]
    users=JSON.parse(fs.readFileSync(path.join(__dirname, '../data store/users.txt'),"utf-8"))

    let user=users.find(x=>{
        if(x.id==uid) return x;
    })
    user.password=npwd
    fs.writeFileSync(path.join(__dirname, '../data store/users.txt'),JSON.stringify(users))
    res.json({message:"Password changed successfully!"})
})

//11. delete user

app.delete("/deluser",(req,res)=>{
    let un=req.headers["username"]
    let pwd=req.headers["password"]
    users=JSON.parse(fs.readFileSync(path.join(__dirname, '../data store/users.txt'),"utf-8"))
    let u1=users.filter(x=>{
        if(x.username!=un && x.password!=pwd) return x;
    })

    if(JSON.stringify(u1)==JSON.stringify(users))
    {
        res.json({message:false}); return;
    }
    fs.writeFileSync(path.join(__dirname, '../data store/users.txt'),JSON.stringify(u1))
    res.json({message:true})
})

app.listen(3010);