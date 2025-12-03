<!-- Test chạy docker ở dưới local -->
<!--
    + Chạy docker nội bộ tùy theo dải mảng để setup chạy
    + Để chạy docker dưới local thay đoạn code trong file Docker CMD ["node", ".next/standalone/server.js"] => CMD ["npm", "run", "start"]
    + Production chạy proxy dải http://10.26.2.55:8080, còn chạy dưới local nội bộ thì tùy theo dải mảng đang chạy
 -->

# Build image cho từng môi trường

npm run docker:build:local # Dockerfile
npm run docker:build:uat # Dockerfile.uat
npm run docker:build:prod # Dockerfile.production
npm run docker:build:krx # Dockerfile.krx

# Run container từ image đã build

npm run docker:run:local # newwebtrade:local (port 5004)
npm run docker:run:uat # newwebtrade:uat (port 5001)
npm run docker:run:prod # newwebtrade:prod (port 5002)
npm run docker:run:krx # newwebtrade:krx (port 5003)

# Rebuild & restart nhanh môi trường UAT

npm run docker:restart:uat

# Dọn container cũ

npm run docker:clean

<!-- setup môi trường -->

# Môi trường bản thật

NEXT_PUBLIC_NEXT_DOMAIN_GATEWAYS=https://gateway.fpts.com.vn
NEXT_PUBLIC_NEXT_DOMAIN_MARKETSTREAM=https://gateway.fpts.com.vn
NEXT_PUBLIC_NEXT_DOMAIN_PUSHER=https://pusher.fpts.com.vn/pusher

# Môi trường bản dev

NEXT_PUBLIC_NEXT_DOMAIN_PUSHER=https://marketstream.fpts.com.vn/pusher
NEXT_PUBLIC_NEXT_DOMAIN_GATEWAYS=http://dev.gateway.fpts.com.vn

# Môi trường bản uat

NEXT_PUBLIC_NEXT_DOMAIN_GATEWAYS=https://rc.ezfutures.fpts.com.vn
NEXT_PUBLIC_NEXT_DOMAIN_MARKETSTREAM=https://gateway.fpts.com.vn
NEXT_PUBLIC_NEXT_DOMAIN_PUSHER=http://pusheruat.fpts.com.vn/pusher

# Môi trường bản krx

NEXT_PUBLIC_NEXT_DOMAIN_GATEWAYS=http://krx.gateway.fpts.com.vn
NEXT_PUBLIC_NEXT_DOMAIN_MARKETSTREAM=https://gateway.fpts.com.vn
NEXT_PUBLIC_NEXT_DOMAIN_PUSHER=http://pusherkrx.fpts.com.vn/pusher
