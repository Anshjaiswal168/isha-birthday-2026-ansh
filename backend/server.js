"use strict";

require("dotenv").config();

const express = require("express");
const path = require("path");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;


/* =========================================================
   MIDDLEWARE
   ========================================================= */

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


/* =========================================================
   OPENAI
   ========================================================= */

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {

    console.error(
        "❌ OPENAI_API_KEY is missing from .env"
    );

} else {

    console.log(
        "✅ OpenAI API key detected"
    );

}

const client = new OpenAI({
    apiKey: apiKey
});


/* =========================================================
   FRONTEND PATH
   ========================================================= */

const frontendPath = path.join(
    __dirname,
    "..",
    "frontend"
);


/* =========================================================
   SERVE FRONTEND
   ========================================================= */

app.use(
    express.static(frontendPath)
);


/* =========================================================
   PHOTOS
   ========================================================= */

/*
   Photos are located here:

   frontend/
       photos/
           photo1.jpg
           photo2.jpg
           photo3.jpg
           photo4.jpg
           photo5.jpg
           photo6.jpg

   Because the complete frontend folder is already being
   served above, these files are automatically available at:

   /photos/photo1.jpg
   /photos/photo2.jpg
   /photos/photo3.jpg
   /photos/photo4.jpg
   /photos/photo5.jpg
   /photos/photo6.jpg
*/


/* =========================================================
   HOME PAGE
   ========================================================= */

app.get(
    "/",
    (req, res) => {

        res.sendFile(
            path.join(
                frontendPath,
                "index.html"
            )
        );

    }
);


/* =========================================================
   BACKEND STATUS
   ========================================================= */

app.get(
    "/api/status",
    (req, res) => {

        res.json({

            success: true,

            message:
                "Isha Birthday Universe backend is running ✨",

            aiConfigured:
                Boolean(apiKey)

        });

    }
);


/* =========================================================
   AI CHAT
   ========================================================= */

app.post(
    "/api/chat",
    async (req, res) => {

        try {

            console.log(
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            );

            console.log(
                "🤖 AI request received"
            );

            const message =
                req.body?.message;


            if (
                typeof message !== "string" ||
                !message.trim()
            ) {

                console.log(
                    "❌ Empty or invalid message"
                );

                return res.status(400).json({

                    success: false,

                    message:
                        "Message is required."

                });

            }


            if (!apiKey) {

                console.log(
                    "❌ OPENAI_API_KEY is missing"
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "OpenAI API key is not configured."

                });

            }


            console.log(
                "💬 User message:",
                message
            );


            const response =
                await client.responses.create({

                    model: "gpt-5-mini",

                    instructions:
                        `
You are Isha, the friendly AI assistant
inside the Isha Birthday Universe website.

Your personality:

- Friendly
- Warm
- Helpful
- Positive
- Fun
- Concise

You are part of a special birthday
website made for Isha.

Do not claim to be a real human.
Do not reveal private API keys or
server secrets.

Keep normal answers short and pleasant.
`,

                    input: message

                });


            const reply =
                response.output_text;


            console.log(
                "✅ AI response received"
            );

            console.log(
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            );


            return res.json({

                success: true,

                reply:
                    reply ||
                    "Isha AI couldn't generate a reply right now ✨"

            });


        } catch (error) {

            console.log(
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            );

            console.error(
                "❌ AI ERROR:",
                error?.message || error
            );

            console.error(
                "❌ AI STATUS:",
                error?.status || "Unknown"
            );

            console.error(
                "❌ AI CODE:",
                error?.code || "Unknown"
            );

            console.log(
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            );


            return res.status(500).json({

                success: false,

                message:
                    "AI is temporarily unavailable."

            });

        }

    }
);


/* =========================================================
   404
   ========================================================= */

app.use(
    (req, res) => {

        res.status(404).json({

            success: false,

            message:
                "Route not found."

        });

    }
);


/* =========================================================
   START SERVER
   ========================================================= */

app.listen(
    PORT,
    () => {

        console.log("");

        console.log(
            "✨ Isha Birthday Universe"
        );

        console.log(
            `🚀 Server running at http://localhost:${PORT}`
        );

        console.log(
            `🌐 Frontend: ${frontendPath}`
        );

        console.log(
            "📸 Photos: frontend/photos"
        );


        if (apiKey) {

            console.log(
                "🤖 AI: API key detected"
            );

        } else {

            console.log(
                "🤖 AI: API key NOT detected"
            );

        }


        console.log("");

    }
);