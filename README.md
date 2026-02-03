# Uraan — AI-Powered Business Platform for Pakistani Women Entrepreneurs

Uraan (meaning "flight" in Urdu) is a Next.js-based web application designed to empower Pakistani women to launch and grow their own businesses. The platform uses AI to provide personalized business recommendations, step-by-step roadmaps, and a collaborative community marketplace.

## 🚀 Features

- **AI-Powered Quiz**: Analyzes skills, interests, and constraints to recommend suitable business ideas.
- **Personalized Roadmaps**: Provides detailed implementation plans with timelines and resources.
- **Collaboration Marketplace**: Connect with service providers to hire for projects.
- **Community Support**: Engage with a network of fellow entrepreneurs.
- **Profile Management**: Showcase your business or service provider profile.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, Lucide React
- **Backend**: Next.js App Router (API Routes)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (Credentials, Google, Facebook)
- **AI Integration**: OpenAI GPT-4o-mini
- **Image Storage**: Cloudinary

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.x or later)
- npm or yarn
- PostgreSQL database

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/uraan.git
   cd uraan
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5444/uraan"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   OPENAI_API_KEY="your-openai-api-key"
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   FACEBOOK_CLIENT_ID="your-facebook-client-id"
   FACEBOOK_CLIENT_SECRET="your-facebook-client-secret"
   ```

4. Run Prisma migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
