# Stage: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package and install
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Truyền biến môi trường khi build (NEXT_PUBLIC_API_URL)
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# In ra giá trị biến để kiểm tra
RUN echo "👉 Building with API URL: $NEXT_PUBLIC_API_URL"

# Build Next.js app với biến môi trường
RUN npm run build

# Stage: Run (chạy nhẹ hơn)
FROM node:18-alpine AS runner
WORKDIR /app

# Copy node_modules và .next từ builder
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]
