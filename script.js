document.addEventListener('DOMContentLoaded', () =>{

    const passwordField = document.querySelector('#password-field');
    const generatePassBtn = document.querySelector('.generate-pass-button');

    //select copy button and call copyPassword function when clicked
    document.querySelector('.copy-pass-button').addEventListener('click', function(){
        
        //copy the generated password to clipboard
        navigator.clipboard.writeText(passwordField.value);
        alert("Password successfully copied !");
    });

    function generatePassword(length = 32){
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/`~ ";
        const charsetLength = charset.length;
        const passwordArray = new Uint32Array(length);
        
        // Fill the array with cryptographically secure random values
        crypto.getRandomValues(passwordArray);
    
        // Convert random values into characters from the charset
        let password = '';
        for(let x = 0; x < length; x++){
            let index = passwordArray[x] % charsetLength;  //get charset index
            password += charset[index];
        }

        return password;
    }

    passwordField.value = generatePassword();

    generatePassBtn.addEventListener('click', function(){
        passwordField.value = generatePassword();
    })
})

/*
Password generation Logic:

1.Create an unsigned int32 bit array
2. Fill the array with random int values.
3. Calculate index by doing modulus for each random value in the array with the charset Length(gives a value less than charsetLength, prevents out of bound error)
4. Map each character with the corresponding calculated index.
*/