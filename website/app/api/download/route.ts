import { createReadStream, existsSync, statSync } from "fs";
import path from "path";
import { Readable } from "stream";

export const dynamic = "force-dynamic";

const GITHUB_RELEASE_URL =
  "https://github.com/GitCoder052023/Qurus/releases/download/v2.2.0/Qurus_v2.2.0.apk";

export async function GET() {
  const localApkPaths = [
    path.resolve(process.cwd(), "public/downloads/Qurus_v2.2.0.apk"),
    path.resolve(process.cwd(), "../build/Qurus_v2.2.0.apk"),
    path.resolve(process.cwd(), "build/Qurus_v2.2.0.apk"),
  ];

  let apkPath: string | null = null;
  for (const p of localApkPaths) {
    if (existsSync(p)) {
      try {
        const stat = statSync(p);
        if (stat.size > 1000000) {
          apkPath = p;
          break;
        }
      } catch {
        // continue
      }
    }
  }

  if (apkPath) {
    try {
      const stat = statSync(apkPath);
      const nodeStream = createReadStream(apkPath);
      // Convert Node stream to web ReadableStream
      const webStream = Readable.toWeb(nodeStream) as unknown as ReadableStream;

      return new Response(webStream, {
        status: 200,
        headers: {
          "Content-Type": "application/vnd.android.package-archive",
          "Content-Disposition": 'attachment; filename="Qurus_v2.2.0.apk"',
          "Content-Length": stat.size.toString(),
          "Cache-Control": "public, max-age=3600",
        },
      });
    } catch (e) {
      console.error("Failed to stream local APK, falling back to GitHub release", e);
    }
  }

  // Graceful fallback to GitHub release direct asset URL
  return Response.redirect(GITHUB_RELEASE_URL, 302);
}
