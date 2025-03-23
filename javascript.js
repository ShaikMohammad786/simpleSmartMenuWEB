document.addEventListener("DOMContentLoaded", function () {

    let currentUser=null;


    let btn1= document.getElementById("b1");
    let btn2= document.getElementById("b2");
    let btn3= document.getElementById("b3");

 

    let check="";

    let logindiv = document.querySelector(".login");
    let opendiv = document.querySelector(".open");
    let step2div = document.querySelector(".step2");
    let signdiv = document.querySelector(".container")
    let aidiv=document.getElementById("chat-container");
    let oks=document.getElementById("oks");
    btn1.addEventListener("click",(e)=>{
        e.preventDefault();
       
      
        logindiv.style.display="block";
        opendiv.style.display="none";
        signdiv.style.display="none";
        aidiv.style.display="none";
        aidiv.style.display="none";
        oks.style.display="none";
         step2div.style.display="none";
        btn1.style.backgroundColor="orange "; 
        
    })
    btn2.addEventListener("click",(e)=>{
        e.preventDefault();
        if(check!=="ok"){
            opendiv.style.display="none";
            aidiv.style.display="none";
        logindiv.style.display="none";
        signdiv.style.display="none";
            oks.style.display="block";
            
            let a = document.getElementById("ok");
            a.innerHTML="Please Login or Signup to acces your AI Assistant";
            a.style.color="red";
            return;
            
            
        }
        
        aidiv.style.display="none";
        logindiv.style.display="none";
        opendiv.style.display="none";
        signdiv.style.display="none";
        step2div.style.display="block"
    })

   
    btn3.addEventListener("click",(e)=>{
        e.preventDefault();
        if(check!=="ok"){
            opendiv.style.display="none";
            aidiv.style.display="none";
        logindiv.style.display="none";
        signdiv.style.display="none";
        step2div.style.display="none"
            oks.style.display="block";
            let a = document.getElementById("ok");
            a.innerHTML="Please Login or Signup to acces your AI Assistant";
            a.style.color="red";
            return;
            
            
        }
        
        aidiv.style.display="block";
        logindiv.style.display="none";
        opendiv.style.display="none";
        signdiv.style.display="none";
        step2div.style.display="none"
    })

   

    let database = JSON.parse(localStorage.getItem("users")) || [ 
        { firstname: "shaik", lastname: "mohammad", age: 18, username: "skmohammad378@gmail.com", password: "SK@mfbks786v" },
        { firstname: "katragadda", lastname: "vandana", age: 19, username: "kvandana378@gmail.com", password: "vinnu123" }
    ];
    

    function saveToLocalStorage() {
        localStorage.setItem("users", JSON.stringify(database));
    }

    let logbtns = document.getElementById("logbtn");
    
    logbtns.addEventListener("click", (e) => {
        e.preventDefault();
        let loglogin = document.getElementById("log").value;
        let logpass = document.getElementById("logpass").value;
        let logres = document.getElementById("logres");
    
        let userFound = database.find(user => user.username === loglogin && user.password === logpass);
    
        if (userFound) {
            currentUser = {...userFound}; 
            console.log("User Found:", userFound);
    
            logindiv.style.display = "none";
            step2div.style.display = "block";
            check = "ok";


    
            document.getElementById("user-name").textContent = currentUser.firstname;
            document.getElementById("names").textContent = currentUser.firstname+currentUser.lastname;
            document.getElementById("user-email").textContent = currentUser.username;
            document.getElementById("user-age").textContent = currentUser.age;
        } else {
            logres.innerHTML = "Username or Password is incorrect";
            logres.style.color = "red";
        }
    });

   document.getElementById("gotoAI").addEventListener("click", () => {
    step2div.style.display = "none";
    aidiv.style.display = "block";
});

document.getElementById("toggleSettings").addEventListener("click", () => {
    let settingsPanel = document.getElementById("settingsPanel");
    settingsPanel.style.display = settingsPanel.style.display === "none" ? "block" : "none";
});


document.getElementById("updatePassword").addEventListener("click", () => {
    if (!currentUser) {
        alert("No user is logged in.");
        return;
    }

    let newPassword = document.getElementById("newPassword").value;
    if (newPassword.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    let userIndex = database.findIndex(user => user.username === currentUser.username);
    if (userIndex !== -1) {
        database[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(database));
        alert("Password updated successfully!");
    } else {
        alert("Error updating password.");
    }
});


document.getElementById("logout").addEventListener("click", () => {
    check = "";
    step2div.style.display = "none";
    logindiv.style.display = "block";
});

    let signupa = document.getElementById("asignup");

    signupa.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(".login").style.display = "none";
        document.querySelector(".container").style.display = "block";
    });

    

    let regex = {
        name: /^[a-zA-Z ]+$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        age: /^(1[89]|[2-5][0-9]|60)$/,
        pincode: /^[0-9]{6}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    };

    function validate(field, pattern, message, errId) {
        let input = document.getElementById(field);
        let error = document.getElementById(errId);
        if (!pattern.test(input.value)) {
            error.textContent = message;
            input.style.border = "2px solid Red";
            return false;
        }
        error.textContent = "";
        input.style.border = "2px solid Green";
        return true;
    }

    document.getElementById("uname").addEventListener("input", () =>
        validate("uname", regex.email, "Enter a valid email ID", "checku")
    );
    document.getElementById("fname").addEventListener("input", () =>
        validate("fname", regex.name, "Only letters allowed", "checkf")
    );
    document.getElementById("lname").addEventListener("input", () =>
        validate("lname", regex.name, "Only letters allowed", "checkl")
    );
    document.getElementById("age").addEventListener("input", () =>
        validate("age", regex.age, "Enter an age between 18 and 60", "checka")
    );
    document.getElementById("pincode").addEventListener("input", () =>
        validate("pincode", regex.pincode, "Enter a valid 6-digit pincode", "checkp")
    );
    document.getElementById("pass").addEventListener("input", () =>
        validate("pass", regex.password, "Min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char", "checkpass")
    );
    document.getElementById("cpass").addEventListener("input", () => {
        let pass = document.getElementById("pass").value;
        let cpass = document.getElementById("cpass");
        let error = document.getElementById("checkcpass");
        if (cpass.value !== pass) {
            error.textContent = "Passwords do not match";
            cpass.style.border = "2px solid Red";
            return false;
        }
        error.textContent = "";
        cpass.style.border = "2px solid Green";
        return true;
    });

    document.getElementById("checking").addEventListener("click", (event) => {
        let isValid = [
            validate("fname", regex.name, "Enter a valid name (only letters allowed)", "checkf"),
            validate("lname", regex.name, "Enter a valid name (only letters allowed)", "checkl"),
            validate("uname", regex.email, "Enter a valid email ID", "checku"),
            validate("age", regex.age, "Enter an age between 18 and 60", "checka"),
            validate("pincode", regex.pincode, "Enter a valid 6-digit pincode", "checkp"),
            validate("pass", regex.password, "Min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char", "checkpass"),
            document.getElementById("cpass").value === document.getElementById("pass").value
        ].every(Boolean);

        if (!isValid) {
            event.preventDefault();
            document.getElementById("failed").textContent = "Enter Valid Details";
            document.getElementById("failed").style.color = "red";
        } else {
            event.preventDefault();
            let firstname = document.getElementById("fname").value;
            let lastname = document.getElementById("lname").value;
            let username = document.getElementById("uname").value;
            let age = document.getElementById("age").value;
            let pincode = document.getElementById("pincode").value;
            let pass = document.getElementById("pass").value;

            if (database.some(user => user.username === username)) {
                document.getElementById("failed").textContent = "Email already exists!";
                document.getElementById("failed").style.color = "red";
                return;
            }

            database.push({ firstname, lastname, username, age, pincode, password: pass });
            saveToLocalStorage();

            document.getElementById("failed").textContent = "Signup successful! Redirecting to login...";
            document.getElementById("failed").style.color = "green";
            document.getElementById("failed").style.fontSize = "small";

            setTimeout(() => {
                document.querySelector(".container").style.display = "none";
                document.querySelector(".login").style.display = "block";
            }, 1000);
            

             firstname = document.getElementById("fname").value="";
             lastname = document.getElementById("lname").value="";
             username = document.getElementById("uname").value="";
             age = document.getElementById("age").value="";
             pincode = document.getElementById("pincode").value="";
             pass = document.getElementById("pass").value="";
             document.getElementById("cpass").value="";
        }
    });


    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("sendBtn");
    const apiKey = "5d7631d46cmshd5b7e150ad0cbdep1cdb8ejsn8ad7e85b8c4b";  
const apiHost = "open-ai21.p.rapidapi.com";  
const apiEndpoint = "chatgpt"; // ✅ Confirm correct endpoint  

window.sendMessage = async function () {  
    let message = userInput.value.trim();  
    if (!message) return;  

    chatBox.innerHTML += `<div><b>You:</b> ${message}</div>`;  
    userInput.value = "";  

    try {  
        console.log("Sending request to API...");  

        const bodyData = JSON.stringify({  
            messages: [{ role: "user", content: message }], // ✅ Correct format  
            web_access: false // ✅ Keep this if required  
        });

        console.log("Request Body:", bodyData);  

        const response = await fetch(`https://${apiHost}/${apiEndpoint}`, {  
            method: "POST",  
            headers: {  
                "x-rapidapi-key": apiKey,  
                "x-rapidapi-host": apiHost,  
                "Content-Type": "application/json"  
            },  
            body: bodyData  
        });  

        console.log("Response received:", response);  

        if (!response.ok) {  
            throw new Error(`HTTP error! Status: ${response.status}`);  
        }  

        const data = await response.json();  
        console.log("Full API response:", JSON.stringify(data, null, 2));  

        if (data && data.result) {  
            chatBox.innerHTML += `<div><b>AI:</b> ${data.result}</div>`;  
        } else {  
            chatBox.innerHTML += `<div><b>AI:</b> Sorry, I couldn't process that.</div>`;  
        }
    } catch (error) {  
        console.error("Error:", error);  
        chatBox.innerHTML += `<div style="color:red;"><b>Error:</b> Failed to fetch response</div>`;  
    }  

    chatBox.scrollTop = chatBox.scrollHeight;  
};




});
    

