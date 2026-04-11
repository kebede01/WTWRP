# WTWR (What to Wear) 🧥

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
[![GCP](https://img.shields.io/badge/Deployment-Google_Cloud_App_Engine-blue?logo=google-cloud)](https://wtwrp-monolith-app.uc.r.appspot.com/)
![License](https://img.shields.io/badge/license-MIT-blue)

**WTWRP** is a full-stack monolith application designed to solve the "what should I wear today?" dilemma. By integrating real-time weather data with a user's digital wardrobe, the app provides personalized outfit suggestions based on the current temperature and conditions.

---

## 🚀 Technical Achievements

### Monolith on Google Cloud

This project is engineered as a **Node.js monolith**, serving both a Vite-powered React frontend and a RESTful Express API from a single deployment. It is optimized specifically for **Google App Engine (Standard Environment)**.

### 🎥 High-Performance Media Streaming

- **Byte-Range Support**: The backend supports `206 Partial Content` headers, allowing the browser to request specific chunks of video.
- **Optimized Buffering**: Users can skip forward or backward by 10s instantly without downloading the full asset.
- **Asset Compression**: Strategic transcoding of media to maintain quality while ensuring a zero-failure rate during cloud transit.

### Security & Session Management

- **Secure Cookie Handling:** Utilizes cookie-parser to manage JWTs via httpOnly cookies, mitigating XSS risks by keeping tokens out of reach from client-side scripts.
- **Automated Testing:** Integrated Jest and Supertest to maintain a robust CI/CD pipeline, ensuring API endpoints and business logic remain stable across deployments.
- **Rate Limiting:** Integrated express-rate-limit to prevent brute-force attacks on authentication endpoints.

- **Automated Testing**
- **Validation Layer**: Strict schema validation using `Celebrate/Joi` to ensure API integrity.
- **Persistent Auth**: Secure JWT-based authentication with `cookie-parser` for seamless session management.

---

## 🛠 Tech Stack

Frontend | Backend | Infrastructure |

```React 18 (Vite)	| Node.js / Express | 	Google Cloud Platform |
Context API	| MongoDB / Mongoose	| App Engine (Standard) |
CSS3 / Flexbox | Jest & Supertest | 	Git / GitHub |
Celebrate / Joi	| Cookie-parser	| Winston Logging |
```

---

## 📁 Key Components

<details>
<summary><b>VideoPlayer.jsx</b> (Custom Implementation)</summary>

A bespoke React component using `useRef` and `useState` to manage a low-level HTML5 Video API.
Features include:

- `autoPlay` & `muted` logic for cross-browser compatibility.
- Interactive time-tracking (Forward/Backward 10s).
- Responsive `object-fit: cover` styling.
</details>

<details>
<summary><b>app.js</b> (Server Configuration)</summary>

Configured to handle:

- Static asset serving from the `/dist` directory.
- `trust proxy` settings for Google Cloud load balancers.
- A catch-all SPA route for client-side routing (React Router).
</details>

---

## 🔧 Installation & Setup

1. **Clone the Repo**

   ````bash
   git clone [https://github.com/kebede01/WTWRP.git](https://github.com/kebede01/WTWRP.git)```

   cd WTWRP

   ````

2. **Create a .env file in the root directory:**
   ````PORT=4000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_super_secret_key
   NODE_ENV=production```
   ````
3. **Install & Build:**
   ````npm install
    npm run build```
   ````
4. ```**Run Locally:**
   npm start
   ```

## Deployment to Google Cloud

This application is ready for the Google Cloud App Engine.

1. Ensure your app.yaml is configured to point to your entry script.
   2.Verify all video assets in public/ are compressed below 32MB.
   3.Deploy via CLI:

```bash
gcloud app deploy
```

## Contributing

1. Fork the Project.
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.
