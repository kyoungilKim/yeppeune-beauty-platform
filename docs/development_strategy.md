# AI 뷰티 컨시어지 플랫폼 - Cursor + v0 + Vercel 개발 전략

## 1. 기술 스택 선정

### Frontend

- **Next.js 14**: App Router, Server Components 활용
- **TypeScript**: 타입 안정성 확보
- **TailwindCSS**: 반응형 UI 구현
- **Framer Motion**: 부드러운 애니메이션
- **shadcn/ui**: 모던한 UI 컴포넌트

### Backend

- **Next.js API Routes**: 서버리스 아키텍처
- **Prisma**: 타입세이프 ORM
- **PlanetScale**: 확장 가능한 MySQL 데이터베이스
- **Vercel**: 배포 및 인프라

### AI/ML

- **TensorFlow.js**: 클라이언트 사이드 AI
- **Replicate**: 서버리스 AI 모델 호스팅
- **OpenAI API**: GPT-4 기반 개인화 추천

### 인증/보안

- **NextAuth.js**: 소셜 로그인
- **JWT**: 토큰 기반 인증
- **Upstash**: 레디스 세션 관리

### 분석/모니터링

- **Vercel Analytics**: 실시간 성능 모니터링
- **Sentry**: 에러 트래킹
- **PostHog**: 사용자 행동 분석

## 2. 시스템 아키텍처

### 2.1 전체 구조

```
[Client]
   │
   ├── [Next.js Frontend]
   │      ├── Pages (App Router)
   │      ├── Components
   │      └── Hooks
   │
   ├── [API Layer]
   │      ├── REST Endpoints
   │      └── tRPC
   │
   ├── [Backend Services]
   │      ├── Auth Service
   │      ├── AI Service
   │      └── Data Service
   │
   └── [Infrastructure]
          ├── Vercel (Hosting)
          ├── PlanetScale (DB)
          └── Replicate (AI)
```

### 2.2 데이터 모델

```prisma
// 사용자 프로필
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  image         String?
  preferences   Json?     // 뷰티/패션 선호도
  measurements  Json?     // 체형 데이터
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

// 뷰티 분석 결과
model BeautyAnalysis {
  id            String    @id @default(cuid())
  userId        String
  faceShape     String    // 얼굴형
  skinTone      String    // 피부톤
  skinConcerns  String[]  // 피부 고민
  colorPalette  String[]  // 퍼스널 컬러
  createdAt     DateTime  @default(now())
  user          User      @relation(fields: [userId], references: [id])
}

// 제품 추천
model Recommendation {
  id            String    @id @default(cuid())
  userId        String
  products      Json[]    // 추천 제품 목록
  category      String    // 카테고리 (스킨케어/메이크업/패션)
  createdAt     DateTime  @default(now())
  user          User      @relation(fields: [userId], references: [id])
}
```

## 3. 핵심 기능 구현

### 3.1 AI 뷰티 분석

```typescript
// services/ai/beautyAnalysis.ts
export async function analyzeFace(imageData: Buffer) {
  // 1. 이미지 전처리
  const processedImage = await preprocessImage(imageData);

  // 2. 얼굴 특징 분석
  const features = await detectFacialFeatures(processedImage);

  // 3. 피부 상태 분석
  const skinAnalysis = await analyzeSkinCondition(processedImage);

  // 4. 결과 종합
  return {
    faceShape: features.faceShape,
    skinTone: features.skinTone,
    skinConcerns: skinAnalysis.concerns,
    recommendations: generateRecommendations(features, skinAnalysis),
  };
}
```

### 3.2 퍼스널 컬러 진단

```typescript
// services/ai/colorAnalysis.ts
export async function analyzePersonalColor(
  skinTone: string,
  hairColor: string,
  eyeColor: string
) {
  // 1. 컬러 특성 추출
  const colorFeatures = extractColorFeatures({
    skin: skinTone,
    hair: hairColor,
    eyes: eyeColor,
  });

  // 2. 계절 타입 분류
  const seasonType = classifySeasonType(colorFeatures);

  // 3. 컬러 팔레트 생성
  const colorPalette = generateColorPalette(seasonType);

  return {
    seasonType,
    colorPalette,
    recommendations: getColorBasedRecommendations(seasonType),
  };
}
```

### 3.3 체형 분석 및 스타일링

```typescript
// services/ai/bodyAnalysis.ts
export async function analyzeBodyShape(measurements: BodyMeasurements) {
  // 1. 체형 분류
  const bodyType = classifyBodyType(measurements);

  // 2. 비율 분석
  const proportions = analyzeProportions(measurements);

  // 3. 스타일 추천
  const styleRecommendations = getStyleRecommendations({
    bodyType,
    proportions,
  });

  return {
    bodyType,
    proportions,
    recommendations: styleRecommendations,
  };
}
```

## 4. UI/UX 디자인

### 4.1 디자인 시스템

```typescript
// styles/theme.ts
export const theme = {
  colors: {
    primary: {
      50: "#fff1f2",
      100: "#ffe4e6",
      // ... 생략
    },
    secondary: {
      // ... 생략
    },
  },
  typography: {
    fontFamily: {
      sans: ["Pretendard", "sans-serif"],
      serif: ["Noto Serif KR", "serif"],
    },
  },
  spacing: {
    // ... 생략
  },
};
```

### 4.2 반응형 레이아웃

```typescript
// components/Layout.tsx
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <Header />
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
```

### 4.3 애니메이션

```typescript
// components/animations.ts
export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 },
};

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};
```

## 5. API 엔드포인트

### 5.1 사용자 관리

```typescript
// pages/api/users/[id].ts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { method } = req;

  switch (method) {
    case "GET":
      // 사용자 정보 조회
      const user = await prisma.user.findUnique({
        where: { id: String(id) },
      });
      return res.status(200).json(user);

    case "PUT":
      // 사용자 정보 업데이트
      const updatedUser = await prisma.user.update({
        where: { id: String(id) },
        data: req.body,
      });
      return res.status(200).json(updatedUser);

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
```

### 5.2 AI 분석

```typescript
// pages/api/analysis/beauty.ts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { imageData } = req.body;

    // 1. 이미지 분석
    const analysis = await analyzeFace(imageData);

    // 2. 결과 저장
    await prisma.beautyAnalysis.create({
      data: {
        userId: req.user.id,
        ...analysis,
      },
    });

    return res.status(200).json(analysis);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Analysis failed" });
  }
}
```

## 6. 배포 전략

### 6.1 CI/CD 파이프라인

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 6.2 모니터링 설정

```typescript
// monitoring/sentry.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Prisma({ tracing: true }),
  ],
});
```

## 7. 테스트 전략

### 7.1 단위 테스트

```typescript
// __tests__/services/beautyAnalysis.test.ts
import { analyzeFace } from "@/services/ai/beautyAnalysis";

describe("Beauty Analysis Service", () => {
  it("should analyze face shape correctly", async () => {
    const imageData = Buffer.from("test-image");
    const result = await analyzeFace(imageData);

    expect(result).toHaveProperty("faceShape");
    expect(result).toHaveProperty("skinTone");
    expect(result.recommendations).toBeInstanceOf(Array);
  });
});
```

### 7.2 통합 테스트

```typescript
// __tests__/api/beauty.test.ts
import { createMocks } from "node-mocks-http";
import beautyHandler from "@/pages/api/analysis/beauty";

describe("/api/analysis/beauty", () => {
  it("should return analysis results", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        imageData: Buffer.from("test-image"),
      },
    });

    await beautyHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toHaveProperty("faceShape");
  });
});
```

## 8. 보안 설정

### 8.1 API 보안

```typescript
// middleware/auth.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/analysis/:path*", "/api/recommendations/:path*"],
};
```

### 8.2 데이터 암호화

```typescript
// utils/encryption.ts
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

export function encrypt(text: string): string {
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-cbc", process.env.ENCRYPTION_KEY!, iv);

  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decrypt(text: string): string {
  const [ivHex, encryptedHex] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const decipher = createDecipheriv(
    "aes-256-cbc",
    process.env.ENCRYPTION_KEY!,
    iv
  );

  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}
```

## 9. 성능 최적화

### 9.1 이미지 최적화

```typescript
// components/OptimizedImage.tsx
import Image from "next/image";
import { useState } from "react";

export function OptimizedImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="relative overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`
          duration-700 ease-in-out
          ${isLoading ? "scale-110 blur-2xl" : "scale-100 blur-0"}
        `}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
}
```

### 9.2 API 캐싱

```typescript
// utils/cache.ts
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

export async function getCachedData<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = 3600
): Promise<T> {
  const cached = await redis.get(key);

  if (cached) {
    return JSON.parse(cached);
  }

  const fresh = await fetchFn();
  await redis.setex(key, ttl, JSON.stringify(fresh));

  return fresh;
}
```

## 10. 확장성 고려사항

### 10.1 국제화 (i18n)

```typescript
// i18n/config.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    ko: {
      translation: require("./locales/ko.json"),
    },
    en: {
      translation: require("./locales/en.json"),
    },
    ja: {
      translation: require("./locales/ja.json"),
    },
  },
  lng: "ko",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
```

### 10.2 플러그인 시스템

```typescript
// plugins/types.ts
export interface Plugin {
  id: string;
  name: string;
  version: string;
  install: () => Promise<void>;
  uninstall: () => Promise<void>;
}

// plugins/manager.ts
export class PluginManager {
  private plugins: Map<string, Plugin> = new Map();

  async installPlugin(plugin: Plugin) {
    await plugin.install();
    this.plugins.set(plugin.id, plugin);
  }

  async uninstallPlugin(pluginId: string) {
    const plugin = this.plugins.get(pluginId);
    if (plugin) {
      await plugin.uninstall();
      this.plugins.delete(pluginId);
    }
  }
}
```

## 11. 문서화

### 11.1 API 문서

```typescript
// docs/swagger.ts
import { createSwaggerSpec } from "next-swagger-doc";

export const swaggerSpec = createSwaggerSpec({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "예쁘네 API Documentation",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
});
```

### 11.2 컴포넌트 문서

```typescript
// stories/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Button",
    variant: "default",
  },
};
```

## 12. 개발 환경 설정

### 12.1 ESLint 설정

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
```

### 12.2 환경 변수

```plaintext
# .env.example
# API Keys
OPENAI_API_KEY=
REPLICATE_API_KEY=

# Database
DATABASE_URL=

# Auth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Storage
CLOUDINARY_URL=
CLOUDINARY_API_SECRET=

# Monitoring
SENTRY_DSN=
```

## 13. 배포 체크리스트

### 사전 준비

- [ ] 환경 변수 설정
- [ ] 데이터베이스 마이그레이션
- [ ] API 키 발급
- [ ] SSL 인증서 준비
- [ ] 도메인 설정

### 보안 검토

- [ ] 의존성 취약점 검사
- [ ] API 엔드포인트 보안
- [ ] CORS 설정
- [ ] 로깅 설정
- [ ] 백업 전략 수립

### 성능 검토

- [ ] 번들 크기 최적화
- [ ] 이미지 최적화
- [ ] API 응답 시간
- [ ] 캐싱 전략
- [ ] CDN 설정

### 모니터링 설정

- [ ] 에러 트래킹
- [ ] 성능 모니터링
- [ ] 사용자 분석
- [ ] 로그 수집
- [ ] 알림 설정
