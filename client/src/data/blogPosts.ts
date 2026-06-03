export type ContentBlock =
  | string
  | { type: "diagram"; svg: string }
  | { type: "code"; lang: string; label?: string; code: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: "technical" | "non-technical";
  tags: string[];
  content: ContentBlock[];
}

const diagramSvg = `<svg width="100%" viewBox="0 0 700 700" role="img" xmlns="http://www.w3.org/2000/svg">
  <title>Automated PostgreSQL backup flow</title>
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
    <style>
      .vps-bg      { fill: #f1efe8; stroke: #888780; }
      .vps-label   { font: 500 13px system-ui, sans-serif; fill: #444441; }
      .step-purple { fill: #EEEDFE; stroke: #534AB7; }
      .step-teal   { fill: #E1F5EE; stroke: #0F6E56; }
      .step-green  { fill: #EAF3DE; stroke: #3B6D11; }
      .step-red    { fill: #FCEBEB; stroke: #A32D2D; }
      .label-main  { font: 500 13px system-ui, sans-serif; }
      .label-sub   { font: 400 11px system-ui, sans-serif; }
      .purple-text { fill: #3C3489; }
      .teal-text   { fill: #085041; }
      .green-text  { fill: #27500A; }
      .red-text    { fill: #791F1F; }
      .conn        { stroke: #bbb; stroke-width: 1; fill: none; }
    </style>
  </defs>

  <!--
    Layout:
    VPS box: x=20 y=20 w=620 h=500 (wider to fit everything inside neatly)
    Steps span x=50→590, centered at x=320

    External services (right column), x=460:
      R2 aligned to step 4 cy → straight horizontal wire, no crossing

    6a (cx=175) and 6b (cx=445) inside VPS
    Both exit bottom of VPS, go down to y=560
    healthchecks at x=30 y=580 (below-left)
    NotifyKit    at x=370 y=580 (below-right)
    Wires drop straight down from 6a/6b bottoms and route cleanly
  -->

  <!-- VPS container -->
  <rect x="20" y="20" width="420" height="500" rx="16" class="vps-bg" stroke-width="0.5"/>
  <text x="36" y="46" class="vps-label">The VPS</text>

  <!-- 1. cron -->
  <rect x="50" y="55" width="360" height="50" rx="8" class="step-purple" stroke-width="0.5"/>
  <text x="230" y="75" text-anchor="middle" class="label-main purple-text">1. cron wakes at 03:00</text>
  <text x="230" y="92" text-anchor="middle" class="label-sub purple-text">triggers the backup program</text>
  <line x1="230" y1="105" x2="230" y2="123" class="conn" marker-end="url(#arr)"/>

  <!-- 2. pg_dump -->
  <rect x="50" y="123" width="360" height="50" rx="8" class="step-purple" stroke-width="0.5"/>
  <text x="230" y="143" text-anchor="middle" class="label-main purple-text">2. pg_dump — full database export</text>
  <text x="230" y="160" text-anchor="middle" class="label-sub purple-text">raw SQL text from the Postgres container</text>
  <line x1="230" y1="173" x2="230" y2="191" class="conn" marker-end="url(#arr)"/>

  <!-- 3. gzip -->
  <rect x="50" y="191" width="360" height="50" rx="8" class="step-purple" stroke-width="0.5"/>
  <text x="230" y="211" text-anchor="middle" class="label-main purple-text">3. compress with gzip → .sql.gz</text>
  <text x="230" y="228" text-anchor="middle" class="label-sub purple-text">shrinks the file before upload</text>
  <line x1="230" y1="241" x2="230" y2="259" class="conn" marker-end="url(#arr)"/>

  <!-- 4. upload cy=284 -->
  <rect x="50" y="259" width="360" height="50" rx="8" class="step-teal" stroke-width="0.5"/>
  <text x="230" y="279" text-anchor="middle" class="label-main teal-text">4. upload to Cloudflare R2</text>
  <text x="230" y="296" text-anchor="middle" class="label-sub teal-text">daily/ · weekly/ · monthly/ folders</text>
  <line x1="230" y1="309" x2="230" y2="327" class="conn" marker-end="url(#arr)"/>

  <!-- 5. prune -->
  <rect x="50" y="327" width="360" height="50" rx="8" class="step-purple" stroke-width="0.5"/>
  <text x="230" y="347" text-anchor="middle" class="label-main purple-text">5. delete files past retention window</text>
  <text x="230" y="364" text-anchor="middle" class="label-sub purple-text">14 days · 8 weeks · 6 months</text>

  <!-- fork to 6a cx=135 and 6b cx=325 -->
  <path d="M230 377 L230 395 L135 395 L135 409" class="conn" marker-end="url(#arr)"/>
  <path d="M230 395 L325 395 L325 409" class="conn" marker-end="url(#arr)"/>

  <!-- 6a success: x=50 y=409 w=170 h=56 cx=135 bottom=465 -->
  <rect x="50" y="409" width="170" height="56" rx="8" class="step-green" stroke-width="0.5"/>
  <text x="135" y="429" text-anchor="middle" class="label-main green-text">6a. success</text>
  <text x="135" y="445" text-anchor="middle" class="label-sub green-text">ping healthchecks.io</text>
  <text x="135" y="458" text-anchor="middle" class="label-sub green-text">(primary monitor)</text>

  <!-- 6b failure: x=240 y=409 w=170 h=56 cx=325 bottom=465 -->
  <rect x="240" y="409" width="170" height="56" rx="8" class="step-red" stroke-width="0.5"/>
  <text x="325" y="429" text-anchor="middle" class="label-main red-text">6b. failure</text>
  <text x="325" y="445" text-anchor="middle" class="label-sub red-text">POST alert to NotifyKit</text>
  <text x="325" y="458" text-anchor="middle" class="label-sub red-text">(backup layer)</text>

  <!-- R2: right of VPS, aligned to step 4 cy=284 -->
  <rect x="460" y="259" width="210" height="50" rx="8" class="step-teal" stroke-width="0.5"/>
  <text x="565" y="279" text-anchor="middle" class="label-main teal-text">Cloudflare R2</text>
  <text x="565" y="296" text-anchor="middle" class="label-sub teal-text">daily/ weekly/ monthly/ — off-VPS</text>
  <!-- straight horizontal from step 4 right to R2 left -->
  <line x1="410" y1="284" x2="458" y2="284" stroke="#0F6E56" stroke-width="1" fill="none" marker-end="url(#arr)"/>

  <!--
    Both 6a and 6b exit from their bottoms, drop below VPS (bottom=520),
    then route to external boxes placed side by side below the VPS.

    healthchecks: x=50  y=580 w=170 cx=135
    NotifyKit:    x=240 y=580 w=170 cx=325

    6a (cx=135) drops straight down → healthchecks
    6b (cx=325) drops straight down → NotifyKit
    No crossing at all.
  -->

  <!-- 6a → healthchecks: straight down -->
  <line x1="135" y1="465" x2="135" y2="578" stroke="#3B6D11" stroke-width="1" fill="none" marker-end="url(#arr)"/>

  <!-- 6b → NotifyKit: straight down -->
  <line x1="325" y1="465" x2="325" y2="578" stroke="#A32D2D" stroke-width="1" fill="none" marker-end="url(#arr)"/>

  <!-- healthchecks.io y=580 -->
  <rect x="50" y="580" width="170" height="62" rx="8" class="step-green" stroke-width="0.5"/>
  <text x="135" y="601" text-anchor="middle" class="label-main green-text">healthchecks.io</text>
  <text x="135" y="617" text-anchor="middle" class="label-sub green-text">alerts if ping stops</text>
  <text x="135" y="630" text-anchor="middle" class="label-sub green-text">(catches silent failures)</text>

  <!-- NotifyKit y=580 -->
  <rect x="240" y="580" width="170" height="62" rx="8" class="step-red" stroke-width="0.5"/>
  <text x="325" y="601" text-anchor="middle" class="label-main red-text">NotifyKit API</text>
  <text x="325" y="617" text-anchor="middle" class="label-sub red-text">explicit failure alert</text>
  <text x="325" y="630" text-anchor="middle" class="label-sub red-text">(backup layer)</text>
</svg>`;

export const blogPosts: BlogPost[] = [
  {
    slug: "i-tried-writing-today",
    title: "I Tried Writing Today",
    excerpt:
      "I started writing with no idea what to write about, but I was sure I had a lot to share, a lot to let out, a lot to write.",
    date: "Mar 2026",
    readTime: "2 min read",
    category: "non-technical",
    tags: ["Journal", "Life"],
    content: [
      "I tried writing today. So did I yesterday, and the day before, and the day before that.",
      "Today I actually did it. I started writing with no idea what to write about, but I was sure I had a lot to share, a lot to let out, a lot to write.",
      "Is this a poem? Or maybe prose?\nNo wait! I think it's a journal. Not so sure, but it does feel good to write.",
      "Being an adult is hard. I mean harrrdd— hard like the undercooked pomo I had earlier today.",
      "I try to navigate it regardless. I talk to friends and family. I try to be there for everyone I care about. I really do.",
      "But sometimes even that can be hard.",
      "Some days I feel like I'm doing great.\nLike I've figured something out.\nLike adulthood might actually be manageable.",
      "And other days I feel like I'm just guessing my way through everything and dealing with whatever comes from it.",
      "But maybe that's the trick.",
      "Maybe everyone is guessing. I think everyone is, but sometimes I find no comfort in that knowledge.",
      "Maybe writing like this—\nmessy, unsure, unfinished—\nis just my way of reminding myself that I'm still here.",
      "Still trying.\nStill figuring it out one sentence at a time.",
      "If you made it this far, thanks for reading.\nMaybe I'll try writing again tomorrow.",
    ],
  },
  {
    slug: "automating-postgresql-backups-with-cloudflare-r2",
    title: "Automating PostgreSQL Backups with Docker and Cloudflare R2.",
    excerpt:
      "A beginner-friendly walkthrough of how I built an automated backup system for my production PostgreSQL database.",
    date: "June 2026",
    readTime: "8 min read",
    category: "technical",
    tags: ["DevOps", "Docker", "VPS", "PostgreSQL"],
    content: [
      // 1. Introduction
      "Getting users is only half the job. Protecting the data behind those users is the other half. A single bad migration, accidental delete, or server failure can wipe out months of activity in minutes. In this post, I'll walk through how I set up automated backups for my PostgreSQL database running on a VPS, including compression, cloud storage, retention policies, and failure monitoring.",

      // 2. Tools
      "Before we proceed, here are the tools and concepts we'll be using:",
      "\n- **NotifyKit**: An open-source notification infrastructure service for sending emails and webhooks. Used here to receive backup failure events, log them, and forward the alert to your destination of choice (Discord, Slack, or anywhere else). \n- **Cloudflare R2**: S3-compatible object storage where the backups are stored off the VPS. (Backblaze B2 would work too.) \n- **VPS**: A virtual private server that provides a dedicated environment for running applications.\n- **PostgreSQL**: An open-source relational database management system.\n- **Cron**: A time-based job scheduler built into Linux. It lets you run a command automatically at a set time, in our case, every night at 3 AM.\n- **pg_dump**: PostgreSQL's built-in logical backup tool. In its default mode, it generates SQL statements that can recreate the database schema and data.  \n- **healthchecks.io**: A dead-man's-switch monitoring service for scheduled jobs.\n- **Golang**: A compiled language that produces a single self-contained binary.\n- **Docker**: The platform running our PostgreSQL container on the VPS.",

      // 3. Big picture
      "\nHere's the full picture before we get into the steps:",
      { type: "diagram", svg: diagramSvg },

      "Throughout the examples below, notifykit is used as the sample application name. Feel free to replace it with your own app name where appropriate, but keep the NOTIFYKIT_* environment variables unchanged.",

      // 4. The program
      "## The program",
      "The entire process is handled by a single binary written in Go. It handles the dump, compression, upload, retention rotation, and both monitoring layers. We'll look at how it works under the hood after the setup.",

      // 5. Setup steps
      "## Step 1 — Install Go",
      "You only need Go on the machine where you build the binary. The VPS only needs to run it, not compile it.",
      {
        type: "code",
        lang: "bash",
        label: "terminal",
        code: `# Check if Go is already installed:
go version

# If not (Ubuntu/Debian):
sudo apt update && sudo apt install -y golang-go`,
      },

      "## Step 2 — Clone the project",
      "The source code is available on GitHub. Clone the repository and move into the project directory:",
      {
        type: "code",
        lang: "bash",
        label: "terminal",
        code: `git clone https://github.com/Brayzonn/vps-pg-backup.git
cd vps-pg-backup`,
      },

      "## Step 3 — Download dependencies",
      "The repository already includes a `go.mod` and `go.sum` file. Run the command below to download all required dependencies before building:",
      {
        type: "code",
        lang: "bash",
        label: "terminal",
        code: `go mod download`,
      },

      "## Step 4 — Build and copy to the VPS",
      "This compiles everything into a single executable. If you're building directly on the VPS, a plain `go build` is fine. If you're building on macOS or Windows for a Linux VPS, you need to tell Go to target Linux explicitly. That's what `GOOS` and `GOARCH` do.",
      {
        type: "code",
        lang: "bash",
        label: "terminal",
        code: `# Building on the VPS (or any Linux machine):
go build -o notifykit-db-backup .

# Building on macOS or Windows targeting a Linux VPS:
GOOS=linux GOARCH=amd64 go build -o notifykit-db-backup .

# Copy the binary to the VPS:
scp notifykit-db-backup user@your-vps:/tmp/

# On the VPS, move it to /usr/local/bin/ 
ssh user@your-vps 'sudo mv /tmp/notifykit-db-backup /usr/local/bin/ && sudo chmod +x /usr/local/bin/notifykit-db-backup'`,
      },
      "## Step 5 — Create the cloud bucket",
      "In your Cloudflare/Backblaze R2 dashboard, create a bucket — e.g. `notifykit-db-backups`. Then create an API token with Object Read & Write access and note your S3 endpoint URL. You'll need all three for the config file in the next step.",

      "## Step 6 — Create the config file",
      "The binary reads all its settings from environment variables. Create a file at `/etc/notifykit-backup.env` and restrict it so only root can read it:",
      {
        type: "code",
        lang: "bash",
        label: "terminal",
        code: `sudo nano /etc/notifykit-backup.env
sudo chmod 600 /etc/notifykit-backup.env`,
      },
      {
        type: "code",
        lang: "bash",
        label: "/etc/notifykit-backup.env",
        code: `PG_CONTAINER=
PG_USER=
PG_DB=

S3_BUCKET=
S3_ENDPOINT=
S3_REGION=auto
S3_ACCESS_KEY=
S3_SECRET_KEY=

RETENTION_DAYS=14
WEEKLY_RETENTION_DAYS=56
MONTHLY_RETENTION_DAYS=186

NOTIFYKIT_API_URL=https://api.notifykit.dev/api/v1/notifications/webhook
NOTIFYKIT_API_KEY=nh_xxxxx
ALERT_WEBHOOK_URL=https://discord.com/api/webhooks/...

HEALTHCHECK_URL=https://hc-ping.com/your-check-uuid`,
      },

      "The first three variables tell the backup program how to connect to PostgreSQL. `PG_CONTAINER` is the Docker container name running Postgres, while `PG_USER` and `PG_DB` are the database credentials passed to `pg_dump`.",

      "The `S3_*` variables configure cloud storage. `S3_BUCKET` is the bucket name you created in Cloudflare R2, `S3_ENDPOINT` is your account's S3 endpoint URL, and the access key pair comes from the API token you created earlier. If you're using Cloudflare R2, leave `S3_REGION` as `auto`.",

      "`RETENTION_*` controls how long backups are kept before being deleted. The values below keep daily backups for 14 days, weekly backups for 8 weeks, and monthly backups for roughly 6 months.",

      "`ALERT_*` on failure, the binary sends a backup_failed event to NotifyKit using NOTIFYKIT_API_URL and NOTIFYKIT_API_KEY. NotifyKit then logs and forwards the notification to ALERT_WEBHOOK_URL (Discord, Slack, etc.). HEALTHCHECK_URL is the ping URL from healthchecks.io used to detect missed backup runs.",

      "## Step 7 — Set up healthchecks.io",
      "Sign up free at healthchecks.io, click **Add Check**, and set Period = 1 day with a Grace period of 1 hour. Add an email or Slack integration so you know when it fires, then copy the ping URL into `HEALTHCHECK_URL` in your env file. The binary already knows to ping it on success and hit `/fail` on failure.",

      "## Step 8 — Test manually",
      "Before trusting cron, run the backup once yourself. The first command loads the environment variables from `/etc/notifykit-backup.env` into your current shell session. The second command starts the backup. Since the env file is root-only `chmod 600`, run the command as root.",

      {
        type: "code",
        lang: "bash",
        label: "terminal",
        code: `sudo bash -c 'set -a; . /etc/notifykit-backup.env; set +a; notifykit-db-backup'`,
      },

      "After it finishes, check that the terminal output ends with `backup OK`, a new backup file appears in your R2 bucket, and your healthchecks.io check reports a successful ping.",

      "## Step 9 — Schedule with cron",
      "Add a single line to your crontab. The `set -a` loads the env file into the shell so the binary can read it. Logs are appended to a file you can check each morning with `tail /var/log/notifykit-backup.log`. Check your server timezone with `timedatectl` so 03:00 means what you expect.",
      {
        type: "code",
        lang: "bash",
        label: "sudo crontab -e",
        code: `0 3 * * * bash -c 'set -a && source /etc/notifykit-backup.env && /usr/local/bin/notifykit-db-backup' >> /var/log/notifykit-backup.log 2>&1`,
      },

      // 6. How it works under the hood
      "## How it works under the hood",
      "The dump function streams `pg_dump` output straight through gzip into a temp file. The uncompressed SQL never touches disk, which keeps things fast and avoids filling up your VPS storage:",
      {
        type: "code",
        lang: "go",
        label: "main.go — dumpAndCompress",
        code: `func dumpAndCompress(c cfg) (string, error) {
  f, _ := os.CreateTemp("", "notifykit_*.sql.gz")
  defer f.Close()

  cmd := exec.Command("docker", "exec", "-t", c.Container,
    "pg_dump", "-U", c.DBUser, "-d", c.DBName, "--clean", "--if-exists")

  stdout, _ := cmd.StdoutPipe()
  cmd.Stderr = os.Stderr

  gz := gzip.NewWriter(f)
  cmd.Start()
  io.Copy(gz, stdout)
  gz.Close()
  cmd.Wait()

  return f.Name(), nil
}`,
      },
      "This is a simplified version for readability. The production code checks and handles every error returned by the filesystem, compression, and process execution steps.",

      "The `run` function ties the whole sequence together — dump, sanity check, upload, promote to weekly/monthly on the right days, then prune old files:",
      {
        type: "code",
        lang: "go",
        label: "main.go — run",
        code: `func run(ctx context.Context, c cfg) error {
  now := time.Now().UTC()
  name := fmt.Sprintf("notifykit_%s.sql.gz", now.Format("2006-01-02_150405"))

  tmp, err := dumpAndCompress(c)
  if err != nil { return fmt.Errorf("dump: %w", err) }
  defer os.Remove(tmp)

  info, _ := os.Stat(tmp)
  if info.Size() < 1024 {
    return fmt.Errorf("dump too small (%d bytes)", info.Size())
  }

  client := s3Client(ctx, c)
  upload(ctx, client, c.Bucket, c.DailyPrefix+name, tmp)

  if now.Weekday() == time.Sunday { copyObject(ctx, client, c.Bucket, c.DailyPrefix+name, c.WeeklyPrefix+name) }
  if now.Day() == 1              { copyObject(ctx, client, c.Bucket, c.DailyPrefix+name, c.MonthlyPrefix+name) }

  rotate(ctx, client, c.Bucket, c.DailyPrefix,   c.DailyKeep)
  rotate(ctx, client, c.Bucket, c.WeeklyPrefix,  c.WeeklyKeep)
  rotate(ctx, client, c.Bucket, c.MonthlyPrefix, c.MonthlyKeep)
  return nil
}`,
      },

      // 7. Wrap up
      "Final note: don't skip the restore drill. Actually download a backup and pipe it into a test database at least once.",

      "The full source code, including the S3 client setup, retention rotation, and both monitoring layers is on [GitHub](https://github.com/Brayzonn/vps-pg-backup.git).",

      "The repository README also includes step-by-step instructions for running the backup manually and restoring a database from a backup file.",

      "Thanks for reading. If you found this useful, feel free to share it, star the repo on github. cheers!",
    ],
  },
];
