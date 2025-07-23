const nodemailer = require("nodemailer");
const GetInvolved = require("../models/GetInvolved");

const getInvolvedSubmission = async (req, res) => {
    try {
        console.log("incoming request body:", req.body);
        const { fullName, phoneNumber, email, message, typeOfInquiry } = req.body;

        if (!fullName || !email || !message || !typeOfInquiry) {
            return res.status(400).json({
                message: "All required fields must be completed: Name, Email, Reason, and Message."
            })
        }

        const newMessage = new GetInvolved({ 
            fullName, 
            phoneNumber,
            email, 
            message,
            typeOfInquiry 
        });
        
        await newMessage.save();

        // This creates a fake Ethereal email account for testing/dev purposes
        // A behind the scenes action that generates an object for user id and password
        // Decided against gmail, but if we used that we'd have .env variables for user and password instead of this testAccount
        const testAccount = await nodemailer.createTestAccount();

        // nodemailer's object for sending the email
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email", // email server
            port: 587, // standard for secure connections (TLS: transport layer security)
            auth: { // login info
                user: testAccount.user, // temporary creds created by createTestAccount fx
                pass: testAccount.pass // only avail while running server
            },
        });

        const mailOptions = {
            from: `"${fullName}" <${email}>`, // the person filling out the form
            to: testAccount.user, // our email, in this case ethereal
            subject: "New Contact Form Message",
            text: ` 
            Name: ${fullName}
            Phone Number: ${phoneNumber}
            Email: ${email}
            Type of Inquiry: ${typeOfInquiry}
            Message: ${message}
            `
            // ^^ renders as a plain text body, "Just the facts, ma'am, just the facts..."
        };

        const info = await transporter.sendMail(mailOptions);
        //console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

        res.status(200).json({
            message: "Email sent and saved successfully!",
            preview: nodemailer.getTestMessageUrl(info) // sends link to view the test email(it's an ethereal thing)
        });

    } catch (err) {
        console.log("Contact form error:", err);
        res.status(500).json({ 
            message: "Failed to send email", error: err
        });
    }
};

const getInvolvedList = async (req, res) => {
    try {
        const { _sort, _order, _start, _end, ...filters } = req.query;

        let query = {};
        
        if (filters.fullName) { 
            query.fullName = { $regex: filters.fullName, $options: 'i' }; 
        }
        if (filters.phoneNumber) { 
            query.phoneNumber = { $regex: filters.phoneNumber, $options: 'i' }; 
        }
        if (filters.email) { 
            query.email = { $regex: filters.email, $options: 'i' }; 
        }
        if (filters.message) { 
            query.message = { $regex: filters.message, $options: 'i' }; 
        }
        if (filters.typeOfInquiry) { 
            query.typeOfInquiry = { $regex: filters.typeOfInquiry, $options: 'i' }; 
        }
        if (filters.date) { 
            query.date = filters.date; // matches to an exact string not a range
        }

        if (filters.q) {
            const searchTerm = { $regex: filters.q, $options: 'i' };
            query.$or = [
                { fullName: searchTerm },
                { email: searchTerm },
                { phoneNumber: searchTerm },
                { message: searchTerm },
                { typeOfInquiry: searchTerm },
                { date: searchTerm }
            ];
        }

        const total = await GetInvolved.countDocuments(query);

        let sortOptions = {};

        if (_sort) {
            sortOptions[_sort] = (_order === "DESC" ? -1 : 1);
        } else {
            sortOptions.createdAt = -1;
        }

        const start = parseInt(_start) || 0;
        const limit = (parseInt(_end) - start) || 25;

        const records = await GetInvolved.find(query)
            .sort(sortOptions)
            .skip(start)
            .limit(limit);

        const formattedRecords = records.map(record => {
            const obj = record.toObject();
            obj.id = obj._id.toString();
            delete obj._id;
            return obj;
        });

        const end = start + formattedRecords.length -1; // or start + limit -1 (if always returning limit)

        res.setHeader("Content-Range", `getInvolved ${start}-${end}/${total}`);
        res.set("Access-Control-Expose-Headers", "Content-Range"); 

        res.status(200).json(formattedRecords);

    } catch (err) {
        console.error("Error fetching getInvolved list:", err);
        res.status(500).json({
            message: "Failed to fetch getInvolved list",
            error: err.message
        });
    }
};

const getInvolvedOne = async (req, res) => {
    try {
        const { id } = req.params; 

        const record = await GetInvolved.findById(id);

        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }

        const obj = record.toObject();
        obj.id = obj._id.toString();
        delete obj._id;

        res.status(200).json(obj);

    } catch (err) {
        console.error("Error fetching single getInvolved record:", err);
        res.status(500).json({
            message: "Failed to fetch single getInvolved record",
            error: err.message
        });
    }
};



module.exports = { getInvolvedSubmission, getInvolvedList, getInvolvedOne };