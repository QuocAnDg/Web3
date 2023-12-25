const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://quocand40:${password}@cluster0.oeic8os.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery',false)
mongoose.connect(url).catch(console.error);

const phoneBookSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
})

const PhoneBook = mongoose.model('Phonebook', phoneBookSchema)
if (process.argv.length==3) {
    PhoneBook
    .find({})
    .then(phonesBook=> {
        console.log("phonesBook : ")
        phonesBook.forEach(phoneBook => {
            console.log(phoneBook["name"] + " " + phoneBook["phoneNumber"])
        });
        mongoose.connection.close()
    })
}
if (process.argv.length==5) {
    const name = process.argv[3]
    const phoneNumber = process.argv[4]
    
    const phoneBook = new PhoneBook({
        name: name,
        phoneNumber: phoneNumber,
    })
    phoneBook.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}

