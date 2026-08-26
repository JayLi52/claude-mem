var __IMPORT_META_URL__ = require("node:url").pathToFileURL(__filename).href;
var{defineProperty:p,getOwnPropertyNames:_1,getOwnPropertyDescriptor:O1}=Object,R1=Object.prototype.hasOwnProperty;function B1(G){return this[G]}var L1=(G)=>{var $=(s??=new WeakMap).get(G),Z;if($)return $;if($=p({},"__esModule",{value:!0}),G&&typeof G==="object"||typeof G==="function"){for(var K of _1(G))if(!R1.call($,K))p($,K,{get:B1.bind(G,K),enumerable:!(Z=O1(G,K))||Z.enumerable})}return s.set(G,$),$},s;var A1=(G)=>G;function N1(G,$){this[G]=A1.bind(null,$)}var P1=(G,$)=>{for(var Z in $)p(G,Z,{get:$[Z],enumerable:!0,configurable:!0,set:N1.bind($,Z)})};var c1={};P1(c1,{SessionStore:()=>z1});module.exports=L1(c1);var a=require("bun:sqlite"),Q1=require("crypto");var _=require("path"),I=require("os"),D=require("fs"),o=require("url");var w1=null;function x1(G){return(w1??process.stderr.write.bind(process.stderr))(G)}function g(G){x1(G)}var i1=process.platform==="win32";function T1(G){return G.replace(/^\uFEFF/,"")}function b(G){return JSON.parse(T1(G))}var __dirname="/Users/terry/work/claude-mem/src/shared";function C1(){if(typeof __dirname<"u")return __dirname;return _.dirname(o.fileURLToPath(__IMPORT_META_URL__))}var s1=C1();function r(G){if(typeof G!=="string"||G.length===0)return G;if(G==="~")return I.homedir();if(G.startsWith("~/"))return _.join(I.homedir(),G.slice(2));return G}function k1(){if(process.env.CLAUDE_MEM_DATA_DIR)return r(process.env.CLAUDE_MEM_DATA_DIR);let G=_.join(I.homedir(),".claude-mem"),$=_.join(G,"settings.json");try{if(D.existsSync($)){let Z=b(D.readFileSync($,"utf-8")),K=Z.env??Z;if(K.CLAUDE_MEM_DATA_DIR)return r(K.CLAUDE_MEM_DATA_DIR)}}catch{}return G}var P=k1(),E1=process.env.CLAUDE_CONFIG_DIR||_.join(I.homedir(),".claude"),r1=_.join(E1,"plugins","marketplaces","thedotmack"),j1=_.join(P,"logs"),o1=_.join(P,"settings.json"),e=_.join(P,"claude-mem.db"),D1=_.join(P,"observer-sessions"),c=_.basename(D1);function G1(G){D.mkdirSync(G,{recursive:!0})}var m={dataDir:()=>P,workerPid:()=>_.join(P,"worker.pid"),serverPid:()=>_.join(P,".server-beta.pid"),serverPort:()=>_.join(P,".server-beta.port"),serverRuntime:()=>_.join(P,".server-beta.runtime.json"),settings:()=>_.join(P,"settings.json"),database:()=>_.join(P,"claude-mem.db"),chroma:()=>_.join(P,"chroma"),combinedCerts:()=>_.join(P,"combined_certs.pem"),transcriptsConfig:()=>_.join(P,"transcript-watch.json"),transcriptsState:()=>_.join(P,"transcript-watch-state.json"),corpora:()=>_.join(P,"corpora"),supervisorRegistry:()=>_.join(P,"supervisor.json"),envFile:()=>_.join(P,".env"),logsDir:()=>j1};var k=require("fs"),$1=require("path");var l;((X)=>{X[X.DEBUG=0]="DEBUG";X[X.INFO=1]="INFO";X[X.WARN=2]="WARN";X[X.ERROR=3]="ERROR";X[X.SILENT=4]="SILENT"})(l||={});var d=null;class Z1{level=null;useColor;logFilePath=null;logFileInitialized=!1;constructor(){this.useColor=process.stdout.isTTY??!1}ensureLogFileInitialized(){if(this.logFileInitialized)return;this.logFileInitialized=!0;try{let G=m.logsDir();if(!k.existsSync(G))k.mkdirSync(G,{recursive:!0});let $=new Date().toISOString().split("T")[0];this.logFilePath=$1.join(G,`claude-mem-${$}.log`)}catch(G){console.error("[LOGGER] Failed to initialize log file:",G instanceof Error?G.message:String(G)),this.logFilePath=null}}getLevel(){if(this.level===null)try{let G=m.settings();if(k.existsSync(G)){let $=k.readFileSync(G,"utf-8"),K=(b($).CLAUDE_MEM_LOG_LEVEL||"INFO").toUpperCase();this.level=l[K]??1}else this.level=1}catch(G){console.error("[LOGGER] Failed to load log level from settings:",G instanceof Error?G.message:String(G)),this.level=1}return this.level}formatData(G){if(G===null||G===void 0)return"";if(typeof G==="string")return G;if(typeof G==="number")return G.toString();if(typeof G==="boolean")return G.toString();if(typeof G==="object"){if(G instanceof Error)return this.getLevel()===0?`${G.message}
${G.stack}`:G.message;if(Array.isArray(G))return`[${G.length} items]`;let $=Object.keys(G);if($.length===0)return"{}";if($.length<=3)return JSON.stringify(G);return`{${$.length} keys: ${$.slice(0,3).join(", ")}...}`}return String(G)}formatTool(G,$){if(!$)return G;let Z=$;if(typeof $==="string")try{Z=JSON.parse($)}catch{Z=$}if(G==="Bash"&&Z.command)return`${G}(${Z.command})`;if(Z.file_path)return`${G}(${Z.file_path})`;if(Z.notebook_path)return`${G}(${Z.notebook_path})`;if(G==="Glob"&&Z.pattern)return`${G}(${Z.pattern})`;if(G==="Grep"&&Z.pattern)return`${G}(${Z.pattern})`;if(Z.url)return`${G}(${Z.url})`;if(Z.query)return`${G}(${Z.query})`;if(G==="Task"){if(Z.subagent_type)return`${G}(${Z.subagent_type})`;if(Z.description)return`${G}(${Z.description})`}if(G==="Skill"&&Z.skill)return`${G}(${Z.skill})`;if(G==="LSP"&&Z.operation)return`${G}(${Z.operation})`;return G}formatTimestamp(G){let $=G.getFullYear(),Z=String(G.getMonth()+1).padStart(2,"0"),K=String(G.getDate()).padStart(2,"0"),V=String(G.getHours()).padStart(2,"0"),X=String(G.getMinutes()).padStart(2,"0"),q=String(G.getSeconds()).padStart(2,"0"),Y=String(G.getMilliseconds()).padStart(3,"0");return`${$}-${Z}-${K} ${V}:${X}:${q}.${Y}`}log(G,$,Z,K,V){if(G<this.getLevel())return;this.ensureLogFileInitialized();let X=this.formatTimestamp(new Date),q=l[G].padEnd(5),Y=$.padEnd(6),J="";if(K?.correlationId)J=`[${K.correlationId}] `;else if(K?.sessionId)J=`[session-${K.sessionId}] `;let F="";if(V!==void 0&&V!==null)if(V instanceof Error)F=this.getLevel()===0?`
${V.message}
${V.stack}`:` ${V.message}`;else if(this.getLevel()===0&&typeof V==="object")try{F=`
`+JSON.stringify(V,null,2)}catch{F=" "+this.formatData(V)}else F=" "+this.formatData(V);let M="";if(K){let{sessionId:A,memorySessionId:w,correlationId:L,...z}=K;if(Object.keys(z).length>0)M=` {${Object.entries(z).map(([R,E])=>`${R}=${E}`).join(", ")}}`}let H=`[${X}] [${q}] [${Y}] ${J}${Z}${M}${F}`;if(this.logFilePath)try{k.appendFileSync(this.logFilePath,H+`
`,"utf8")}catch(A){let w=A instanceof Error?A:Error(String(A));g(`[LOGGER] Failed to write to log file: ${w.message}
${w.stack??""}
`)}else g(H+`
`)}debug(G,$,Z,K){this.log(0,G,$,Z,K)}info(G,$,Z,K){this.log(1,G,$,Z,K)}warn(G,$,Z,K){this.log(2,G,$,Z,K)}setErrorSink(G){d=G}error(G,$,Z,K){this.log(3,G,$,Z,K),this.routeErrorToSink($,Z,K)}routeErrorToSink(G,$,Z){try{if(!d||!(Z instanceof Error))return;d(Z)}catch{}}dataIn(G,$,Z,K){this.info(G,`→ ${$}`,Z,K)}dataOut(G,$,Z,K){this.info(G,`← ${$}`,Z,K)}success(G,$,Z,K){this.info(G,`✓ ${$}`,Z,K)}failure(G,$,Z,K){this.error(G,`✗ ${$}`,Z,K)}}var W=new Z1;var K1=require("crypto");function X1(G,$,Z){return K1.createHash("sha256").update([G||"",$||"",Z||""].join("\x00")).digest("hex").slice(0,16)}var U="claude";function f1(G){return G.trim().toLowerCase().replace(/\s+/g,"-")}function T(G){if(!G)return"claude";let $=f1(G);if(!$)return"claude";if($==="transcript")return"codex";if($.includes("codex"))return"codex";if($.includes("cursor"))return"cursor";if($.includes("claude"))return"claude";return $}function V1(G){let $=["claude","codex","cursor"];return[...G].sort((Z,K)=>{let V=$.indexOf(Z),X=$.indexOf(K);if(V!==-1||X!==-1){if(V===-1)return 1;if(X===-1)return-1;return V-X}return Z.localeCompare(K)})}function q1(G,$,Z,K,V){let X=Date.now()-K,q=V!==void 0?"up.session_db_id = ?":"up.content_session_id = ?",Y=V??$;return G.prepare(`
    SELECT
      up.*,
      s.memory_session_id,
      s.project,
      COALESCE(s.platform_source, '${U}') as platform_source
    FROM user_prompts up
    JOIN sdk_sessions s ON up.session_db_id = s.id
    WHERE ${q}
      AND up.prompt_text = ?
      AND up.created_at_epoch >= ?
    ORDER BY up.created_at_epoch DESC
    LIMIT 1
  `).get(Y,Z,X)??void 0}var Y1=["private","claude-mem-context","system_instruction","system-instruction","persisted-output","system-reminder"],W1=new RegExp(`<(${Y1.join("|")})\\b[^>]*>[\\s\\S]*?</\\1>`,"g");var J1=100;function I1(G){let $=Object.fromEntries(Y1.map((V)=>[V,0]));W1.lastIndex=0;let Z=0,K=G.replace(W1,(V,X)=>{return $[X]=($[X]??0)+1,Z+=1,""});if(Z>J1)W.warn("SYSTEM","tag count exceeds limit",void 0,{tagCount:Z,maxAllowed:J1,contentLength:G.length});return{stripped:K.trim(),counts:$}}function F1(G){return I1(G).stripped}var v1=["task-notification"],Y0=new RegExp(`^\\s*<(${v1.join("|")})\\b[^>]*>(?:(?!<\\1\\b|</\\1\\b)[\\s\\S])*</\\1>\\s*$`);var i=4000;function h(G){let $=G.trim(),K=F1(G).trim()||$;if(K.length<=i)return K;return W.debug("DB","Truncated stored prompt text to the configured cap",{originalLength:K.length,storedLength:i}),`${K.slice(0,i-1)}…`}var y1=5000,g1=4194304;function b1(G){return G.prepare(`
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
      AND name NOT LIKE 'sqlite_%'
    LIMIT 1
  `).get()!=null}function f(G,$,Z){try{G.run($)}catch(K){let V=K instanceof Error?K:Error(String(K));throw W.warn("DB",`Failed to apply SQLite pragma ${Z}`,{sql:$},V),K}}function U1(G,$={}){let{enableWal:Z=!0,enableIncrementalAutoVacuum:K=!0}=$;if(f(G,`PRAGMA busy_timeout = ${y1}`,"busy_timeout"),f(G,"PRAGMA foreign_keys = ON","foreign_keys"),f(G,"PRAGMA synchronous = NORMAL","synchronous"),f(G,`PRAGMA journal_size_limit = ${g1}`,"journal_size_limit"),K&&!b1(G))f(G,"PRAGMA auto_vacuum = INCREMENTAL","auto_vacuum");if(Z)f(G,"PRAGMA journal_mode = WAL","journal_mode")}var M1=4096;var h1=new Set(["set_title","set_prompt_session","remap_project"]),S1=/^(?:0|[1-9][0-9]*)$/,H1=18446744073709551615n;function C(G){throw W.debug("CLOUD_SYNC","Rejected invalid canonical content",{reason:G}),Error(`canonical content: ${G}`)}function u(G,$={}){if(typeof G!=="string"||!S1.test(G))return C("decimal values must be unsigned base-10 strings without leading zeroes");if(BigInt(G)>H1)C("decimal value exceeds uint64");if($.positive&&G==="0")C("decimal value must be positive");return G}function n(G){let $=u(G);if(BigInt($)===H1)C("uint64 sequence overflow");return(BigInt($)+1n).toString(10)}function u1(G){if(G===null||typeof G!=="object"||Array.isArray(G))C("mutation must be an object");let $=G;if(typeof $.op!=="string"||!h1.has($.op))C("unsupported mutation op");if($.op==="set_title"){let X=v($,["fields","op","target"],"set_title"),q=S(X.target,["content_session_id","memory_session_id","platform_source"],"set_title.target");if(q.memory_session_id===void 0&&q.content_session_id===void 0)C("set_title target requires a session identifier");for(let J of["memory_session_id","content_session_id","platform_source"])if(q[J]!==void 0)j(q[J],J);let Y=v(X.fields,["custom_title"],"set_title.fields");j(Y.custom_title,"custom_title");return}if($.op==="set_prompt_session"){let X=v($,["fields","op","target"],"set_prompt_session"),q=v(X.target,["origin_device_id","origin_local_id"],"set_prompt_session.target");p1(q.origin_device_id),u(q.origin_local_id);let Y=S(X.fields,["content_session_id","memory_session_id","platform_source","project"],"set_prompt_session.fields");j(Y.memory_session_id,"memory_session_id");for(let J of["content_session_id","platform_source","project"])if(Y[J]!==void 0)j(Y[J],J);return}let Z=v($,["fields","op","where"],"remap_project"),K=S(Z.where,["memory_session_id","merged_into_project_is_null","project"],"remap_project.where");if(K.project!==void 0)j(K.project,"project");if(K.memory_session_id!==void 0)j(K.memory_session_id,"memory_session_id");if(K.merged_into_project_is_null!==void 0&&K.merged_into_project_is_null!==!0)C("merged_into_project_is_null may only be true");if(Object.keys(K).length===0)C("remap_project where is empty");let V=S(Z.fields,["merged_into_project","project"],"remap_project.fields");if(V.project!==void 0)j(V.project,"project");if(V.merged_into_project!==void 0)j(V.merged_into_project,"merged_into_project");if(Object.keys(V).length===0)C("remap_project fields are empty")}function t(G){u1(G)}function p1(G){if(typeof G!=="string"||G.length===0||Buffer.byteLength(G,"utf8")>128)return C("origin_device_id must be a non-empty string of at most 128 UTF-8 bytes");return G}function j(G,$){if(typeof G!=="string"||G.length===0||G.trim().length===0||Buffer.byteLength(G,"utf8")>M1)return C(`${$} must be a non-blank string of at most ${M1} UTF-8 bytes`);return G}function v(G,$,Z){if(G===null||typeof G!=="object"||Array.isArray(G))return C(`${Z} must be an object`);let K=G,V=Object.keys(K).sort(),X=[...$].sort();if(V.length!==X.length||V.some((q,Y)=>q!==X[Y]))C(`${Z} must contain exactly: ${X.join(", ")}`);return K}function S(G,$,Z){if(G===null||typeof G!=="object"||Array.isArray(G))return C(`${Z} must be an object`);let K=G,V=new Set($),X=Object.keys(K).find((q)=>!V.has(q));if(X)C(`${Z} contains unknown field ${X}`);return K}class z1{db;constructor(G=e){if(G instanceof a.Database)this.db=G;else{if(G!==":memory:")G1(P);this.db=new a.Database(G)}U1(this.db),this.initializeSchema(),this.ensureWorkerPortColumn(),this.ensurePromptTrackingColumns(),this.removeSessionSummariesUniqueConstraint(),this.addObservationHierarchicalFields(),this.makeObservationsTextNullable(),this.createUserPromptsTable(),this.ensureDiscoveryTokensColumn(),this.createPendingMessagesTable(),this.renameSessionIdColumns(),this.addFailedAtEpochColumn(),this.addOnUpdateCascadeToForeignKeys(),this.addObservationContentHashColumn(),this.addSessionCustomTitleColumn(),this.addSessionPlatformSourceColumn(),this.addObservationModelColumns(),this.ensureMergedIntoProjectColumns(),this.addObservationSubagentColumns(),this.addObservationsUniqueContentHashIndex(),this.addObservationsMetadataColumn(),this.dropDeadPendingMessagesColumns(),this.ensurePendingMessagesToolUseIdColumn(),this.dropWorkerPidColumn(),this.ensureSDKSessionsPlatformContentIdentity(),this.ensureUserPromptsSessionDbId(),this.ensurePendingMessagesSessionToolUniqueIndex(),this.ensureSyncedAtColumns(),this.ensureSyncOriginColumns(),this.ensureSyncOutbox(),this.ensureSyncEntityLedger(),this.ensureSyncRevisionTextAffinity(),this.initializeSyncHubLaunchBaseline(),this.addObservationRecallStatsColumns(),this.normalizeConceptTags()}getIndexColumns(G){return this.db.query(`PRAGMA index_info(${JSON.stringify(G)})`).all().map(($)=>$.name)}hasUniqueIndexOnColumns(G,$){return this.db.query(`PRAGMA index_list(${G})`).all().some((K)=>{if(K.unique!==1)return!1;let V=this.getIndexColumns(K.name);return V.length===$.length&&V.every((X,q)=>X===$[q])})}resolvePromptSessionDbId(G,$,Z){if($!==void 0)return $;let K=Z?T(Z):void 0;if(K)return this.db.prepare(`
        SELECT id
        FROM sdk_sessions
        WHERE COALESCE(NULLIF(platform_source, ''), ?) = ?
          AND content_session_id = ?
        LIMIT 1
      `).get(U,K,G)?.id??null;return this.db.prepare(`
      SELECT id
      FROM sdk_sessions
      WHERE content_session_id = ?
      ORDER BY CASE COALESCE(NULLIF(platform_source, ''), '${U}')
        WHEN '${U}' THEN 0
        ELSE 1
      END, id
      LIMIT 1
    `).get(G)?.id??null}dropWorkerPidColumn(){let G=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(32),Z=this.db.query("PRAGMA table_info(pending_messages)").all().some((K)=>K.name==="worker_pid");if(G&&!Z)return;if(Z)try{this.db.run("DROP INDEX IF EXISTS idx_pending_messages_worker_pid"),this.db.run("ALTER TABLE pending_messages DROP COLUMN worker_pid"),W.debug("DB","Dropped worker_pid column and its index from pending_messages")}catch(K){W.warn("DB","Failed to drop worker_pid column from pending_messages",{},K instanceof Error?K:Error(String(K)));return}if(!G)this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(32,new Date().toISOString())}ensureSDKSessionsPlatformContentIdentity(){let G=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(33),$=this.hasUniqueIndexOnColumns("sdk_sessions",["content_session_id"]),Z=this.hasUniqueIndexOnColumns("sdk_sessions",["platform_source","content_session_id"]),V=this.db.query("PRAGMA table_info(sdk_sessions)").all().some((X)=>X.name==="platform_source");if(G&&!$&&Z&&V)return;if(!V)this.db.run(`ALTER TABLE sdk_sessions ADD COLUMN platform_source TEXT NOT NULL DEFAULT '${U}'`);if(this.db.run(`
      UPDATE sdk_sessions
      SET platform_source = '${U}'
      WHERE platform_source IS NULL OR platform_source = ''
    `),$){this.db.run("PRAGMA foreign_keys = OFF"),this.db.run("BEGIN TRANSACTION");try{this.rebuildSdkSessionsWithCompositeIdentity(G),this.db.run("COMMIT")}catch(X){this.db.run("ROLLBACK");let q=X instanceof Error?X:Error(String(X));throw W.error("DB","Failed to rebuild sdk_sessions with composite identity, rolled back",{},q),X}finally{this.db.run("PRAGMA foreign_keys = ON")}return}if(this.db.run("CREATE UNIQUE INDEX IF NOT EXISTS ux_sdk_sessions_platform_content ON sdk_sessions(platform_source, content_session_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_platform_source ON sdk_sessions(platform_source)"),!G)this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(33,new Date().toISOString())}rebuildSdkSessionsWithCompositeIdentity(G){if(this.db.run("DROP TABLE IF EXISTS sdk_sessions_new"),this.db.run(`
      CREATE TABLE sdk_sessions_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content_session_id TEXT NOT NULL,
        memory_session_id TEXT UNIQUE,
        project TEXT NOT NULL,
        platform_source TEXT NOT NULL DEFAULT '${U}',
        user_prompt TEXT,
        started_at TEXT NOT NULL,
        started_at_epoch INTEGER NOT NULL,
        completed_at TEXT,
        completed_at_epoch INTEGER,
        status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'completed', 'failed')),
        worker_port INTEGER,
        prompt_counter INTEGER DEFAULT 0,
        custom_title TEXT
      )
    `),this.db.run(`
      INSERT INTO sdk_sessions_new (
        id, content_session_id, memory_session_id, project, platform_source,
        user_prompt, started_at, started_at_epoch, completed_at, completed_at_epoch,
        status, worker_port, prompt_counter, custom_title
      )
      SELECT
        id, content_session_id, memory_session_id, project,
        COALESCE(NULLIF(platform_source, ''), '${U}'),
        user_prompt, started_at, started_at_epoch, completed_at, completed_at_epoch,
        status, worker_port, prompt_counter, custom_title
      FROM sdk_sessions
    `),this.db.run("DROP TABLE sdk_sessions"),this.db.run("ALTER TABLE sdk_sessions_new RENAME TO sdk_sessions"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_claude_id ON sdk_sessions(content_session_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_sdk_id ON sdk_sessions(memory_session_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_project ON sdk_sessions(project)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_status ON sdk_sessions(status)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_started ON sdk_sessions(started_at_epoch DESC)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_platform_source ON sdk_sessions(platform_source)"),this.db.run("CREATE UNIQUE INDEX IF NOT EXISTS ux_sdk_sessions_platform_content ON sdk_sessions(platform_source, content_session_id)"),!G)this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(33,new Date().toISOString())}ensureUserPromptsSessionDbId(){let G=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(34);if(this.db.query("SELECT name FROM sqlite_master WHERE type='table' AND name='user_prompts'").all().length===0){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(34,new Date().toISOString());return}let K=this.db.query("PRAGMA table_info(user_prompts)").all().some((J)=>J.name==="session_db_id"),X=this.db.query("PRAGMA foreign_key_list(user_prompts)").all().some((J)=>J.table==="sdk_sessions"&&J.from==="content_session_id");if(G&&K&&!X)return;let q=this.db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='user_prompts_fts'").all().length>0,Y=K?`COALESCE(up.session_db_id, (
          SELECT s.id FROM sdk_sessions s
          WHERE s.content_session_id = up.content_session_id
          ORDER BY CASE COALESCE(NULLIF(s.platform_source, ''), '${U}')
            WHEN '${U}' THEN 0
            ELSE 1
          END, s.id
          LIMIT 1
        ))`:`(
          SELECT s.id FROM sdk_sessions s
          WHERE s.content_session_id = up.content_session_id
          ORDER BY CASE COALESCE(NULLIF(s.platform_source, ''), '${U}')
            WHEN '${U}' THEN 0
            ELSE 1
          END, s.id
          LIMIT 1
        )`;this.db.run("PRAGMA foreign_keys = OFF"),this.db.run("BEGIN TRANSACTION");try{this.rebuildUserPromptsWithSessionDbId(G,Y,q),this.db.run("COMMIT")}catch(J){this.db.run("ROLLBACK");let F=J instanceof Error?J:Error(String(J));throw W.error("DB","Failed to rebuild user_prompts with session_db_id, rolled back",{},F),J}finally{this.db.run("PRAGMA foreign_keys = ON")}}rebuildUserPromptsWithSessionDbId(G,$,Z){if(this.db.run("DROP TRIGGER IF EXISTS user_prompts_ai"),this.db.run("DROP TRIGGER IF EXISTS user_prompts_ad"),this.db.run("DROP TRIGGER IF EXISTS user_prompts_au"),this.db.run("DROP TABLE IF EXISTS user_prompts_new"),this.db.run(`
      CREATE TABLE user_prompts_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_db_id INTEGER,
        content_session_id TEXT NOT NULL,
        prompt_number INTEGER NOT NULL,
        prompt_text TEXT NOT NULL,
        created_at TEXT NOT NULL,
        created_at_epoch INTEGER NOT NULL,
        FOREIGN KEY(session_db_id) REFERENCES sdk_sessions(id) ON DELETE CASCADE
      )
    `),this.db.run(`
      INSERT INTO user_prompts_new (
        id, session_db_id, content_session_id, prompt_number,
        prompt_text, created_at, created_at_epoch
      )
      SELECT
        up.id,
        ${$},
        up.content_session_id,
        up.prompt_number,
        up.prompt_text,
        up.created_at,
        up.created_at_epoch
      FROM user_prompts up
    `),this.db.run("DROP TABLE user_prompts"),this.db.run("ALTER TABLE user_prompts_new RENAME TO user_prompts"),this.db.run("CREATE INDEX IF NOT EXISTS idx_user_prompts_session ON user_prompts(session_db_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_user_prompts_claude_session ON user_prompts(content_session_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_user_prompts_created ON user_prompts(created_at_epoch DESC)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_user_prompts_prompt_number ON user_prompts(prompt_number)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_user_prompts_lookup ON user_prompts(session_db_id, prompt_number)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_user_prompts_content_lookup ON user_prompts(content_session_id, prompt_number)"),Z)this.db.run(`
        CREATE TRIGGER user_prompts_ai AFTER INSERT ON user_prompts BEGIN
          INSERT INTO user_prompts_fts(rowid, prompt_text)
          VALUES (new.id, new.prompt_text);
        END;

        CREATE TRIGGER user_prompts_ad AFTER DELETE ON user_prompts BEGIN
          INSERT INTO user_prompts_fts(user_prompts_fts, rowid, prompt_text)
          VALUES('delete', old.id, old.prompt_text);
        END;

        CREATE TRIGGER user_prompts_au AFTER UPDATE ON user_prompts BEGIN
          INSERT INTO user_prompts_fts(user_prompts_fts, rowid, prompt_text)
          VALUES('delete', old.id, old.prompt_text);
          INSERT INTO user_prompts_fts(rowid, prompt_text)
          VALUES (new.id, new.prompt_text);
        END;
      `),this.db.run("INSERT INTO user_prompts_fts(user_prompts_fts) VALUES('rebuild')");if(!G)this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(34,new Date().toISOString())}ensurePendingMessagesSessionToolUniqueIndex(){let G=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(35);if(this.db.query("SELECT name FROM sqlite_master WHERE type='table' AND name='pending_messages'").all().length===0){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(35,new Date().toISOString());return}let Z=this.hasUniqueIndexOnColumns("pending_messages",["session_db_id","tool_use_id"]);if(G&&Z)return;this.db.run("BEGIN TRANSACTION");try{this.recreatePendingSessionToolUniqueIndex(G),this.db.run("COMMIT")}catch(K){this.db.run("ROLLBACK");let V=K instanceof Error?K:Error(String(K));throw W.error("DB","Failed to recreate ux_pending_session_tool index, rolled back",{},V),K}}recreatePendingSessionToolUniqueIndex(G){if(this.db.run("DROP INDEX IF EXISTS ux_pending_session_tool"),this.db.run(`
      DELETE FROM pending_messages
       WHERE id IN (
         SELECT id
           FROM (
             SELECT id,
                    ROW_NUMBER() OVER (
                      PARTITION BY session_db_id, tool_use_id
                      ORDER BY CASE status
                        WHEN 'processing' THEN 0
                        WHEN 'pending' THEN 1
                        ELSE 2
                      END, id
                    ) AS duplicate_rank
               FROM pending_messages
              WHERE tool_use_id IS NOT NULL
           )
          WHERE duplicate_rank > 1
         )
    `),this.db.run(`
      CREATE UNIQUE INDEX IF NOT EXISTS ux_pending_session_tool
      ON pending_messages(session_db_id, tool_use_id)
      WHERE tool_use_id IS NOT NULL
    `),!G)this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(35,new Date().toISOString())}ensureSyncedAtColumns(){for(let G of["observations","session_summaries","user_prompts"]){if(!this.db.query(`PRAGMA table_info(${G})`).all().some((K)=>K.name==="synced_at"))this.db.run(`ALTER TABLE ${G} ADD COLUMN synced_at INTEGER`),W.debug("DB",`Added synced_at column to ${G} table`);this.db.run(`CREATE INDEX IF NOT EXISTS idx_${G}_unsynced ON ${G}(id) WHERE synced_at IS NULL`)}this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(39,new Date().toISOString())}ensureSyncOriginColumns(){for(let G of["observations","session_summaries","user_prompts"]){let $=this.db.query(`PRAGMA table_info(${G})`).all(),Z=new Set($.map((K)=>K.name));if(!Z.has("origin_device_id"))this.db.run(`ALTER TABLE ${G} ADD COLUMN origin_device_id TEXT`),W.debug("DB",`Added origin_device_id column to ${G} table`);if(!Z.has("origin_local_id"))this.db.run(`ALTER TABLE ${G} ADD COLUMN origin_local_id TEXT`),W.debug("DB",`Added origin_local_id column to ${G} table`);if(!Z.has("sync_rev"))this.db.run(`ALTER TABLE ${G} ADD COLUMN sync_rev TEXT NOT NULL DEFAULT '1'`),W.debug("DB",`Added sync_rev column to ${G} table`);this.db.run(`
        CREATE UNIQUE INDEX IF NOT EXISTS ux_${G}_origin
        ON ${G}(origin_device_id, origin_local_id)
        WHERE origin_device_id IS NOT NULL
      `)}this.db.run(`
      CREATE TABLE IF NOT EXISTS sync_state (
        k TEXT PRIMARY KEY,
        v TEXT
      )
    `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(41,new Date().toISOString())}ensureSyncOutbox(){this.db.run(`
      CREATE TABLE IF NOT EXISTS sync_outbox (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        op_uuid TEXT NOT NULL UNIQUE,
        rev TEXT NOT NULL DEFAULT '1',
        body TEXT NOT NULL,
        canonical_body TEXT,
        operation_sha256 TEXT,
        created_at_epoch INTEGER NOT NULL
      )
    `);let G=new Set(this.db.query("PRAGMA table_info(sync_outbox)").all().map(($)=>$.name));if(!G.has("canonical_body"))this.db.run("ALTER TABLE sync_outbox ADD COLUMN canonical_body TEXT");if(!G.has("operation_sha256"))this.db.run("ALTER TABLE sync_outbox ADD COLUMN operation_sha256 TEXT");this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(42,new Date().toISOString())}ensureSyncRevisionTextAffinity(){let G=[{table:"observations",column:"sync_rev",temporary:"sync_rev_text_v46"},{table:"session_summaries",column:"sync_rev",temporary:"sync_rev_text_v46"},{table:"user_prompts",column:"sync_rev",temporary:"sync_rev_text_v46"},{table:"sync_outbox",column:"rev",temporary:"rev_text_v46"}],$=(X,q)=>this.db.query(`PRAGMA table_info(${X})`).all().find((Y)=>Y.name===q),Z=(X)=>X?.type.trim().toUpperCase()==="TEXT";if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(46)&&G.every((X)=>Z($(X.table,X.column))))return;this.db.transaction(()=>{for(let X of G){let q=this.db.query(`PRAGMA table_info(${X.table})`).all(),Y=q.find((F)=>F.name===X.column);if(!Y)throw Error(`schema v46: missing ${X.table}.${X.column}`);for(let F of this.db.query(`
          SELECT CAST(id AS TEXT) AS row_id,
                 typeof(${X.column}) AS storage_type,
                 CAST(${X.column} AS TEXT) AS revision
          FROM ${X.table}
        `).iterate()){let M=F;if(M.storage_type==="real")throw Error(`schema v46: ${X.table}.${X.column} row ${M.row_id} is REAL and unrecoverably rounded`);if(M.storage_type!=="integer"&&M.storage_type!=="text")throw Error(`schema v46: ${X.table}.${X.column} row ${M.row_id} has unsupported ${M.storage_type} storage`);try{u(M.revision,{positive:!0})}catch{throw Error(`schema v46: ${X.table}.${X.column} row ${M.row_id} is not a positive canonical uint64 revision`)}}if(Z(Y))continue;if(q.some((F)=>F.name===X.temporary))throw Error(`schema v46: unexpected temporary column ${X.table}.${X.temporary}`);this.db.run(`ALTER TABLE ${X.table} ADD COLUMN ${X.temporary} TEXT NOT NULL DEFAULT '1'`),this.db.run(`UPDATE ${X.table} SET ${X.temporary} = CAST(${X.column} AS TEXT)`);let J=this.db.prepare(`
          SELECT CAST(id AS TEXT) AS row_id
          FROM ${X.table}
          WHERE ${X.temporary} <> CAST(${X.column} AS TEXT)
          LIMIT 1
        `).get();if(J)throw Error(`schema v46: failed to copy ${X.table}.${X.column} row ${J.row_id} exactly`);this.db.run(`ALTER TABLE ${X.table} DROP COLUMN ${X.column}`),this.db.run(`ALTER TABLE ${X.table} RENAME COLUMN ${X.temporary} TO ${X.column}`)}this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(46,new Date().toISOString())})()}ensureSyncEntityLedger(){if(this.db.run(`
      CREATE TABLE IF NOT EXISTS sync_entity_heads (
        entity_id TEXT PRIMARY KEY,
        kind TEXT NOT NULL CHECK (kind IN ('observation', 'summary', 'prompt')),
        origin_device_id TEXT NOT NULL,
        origin_local_id TEXT NOT NULL,
        entity_rev TEXT NOT NULL,
        operation_sha256 TEXT NOT NULL,
        deleted INTEGER NOT NULL CHECK (deleted IN (0, 1)),
        updated_at_epoch INTEGER NOT NULL
      )
    `),this.db.run(`
      CREATE TABLE IF NOT EXISTS sync_content_outbox (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        entity_id TEXT NOT NULL,
        kind TEXT NOT NULL CHECK (kind IN ('observation', 'summary', 'prompt')),
        origin_local_id TEXT NOT NULL,
        entity_rev TEXT NOT NULL,
        body TEXT NOT NULL,
        operation_sha256 TEXT NOT NULL,
        deleted INTEGER NOT NULL DEFAULT 0 CHECK (deleted IN (0, 1)),
        created_at_epoch INTEGER NOT NULL,
        UNIQUE(entity_id, entity_rev)
      )
    `),!new Set(this.db.query("PRAGMA table_info(sync_content_outbox)").all().map(($)=>$.name)).has("deleted"))this.db.run("ALTER TABLE sync_content_outbox ADD COLUMN deleted INTEGER NOT NULL DEFAULT 0"),this.db.run(`
        UPDATE sync_content_outbox
        SET deleted = CASE WHEN json_extract(body, '$.deleted') = 1 THEN 1 ELSE 0 END
      `);this.db.run(`
      CREATE TABLE IF NOT EXISTS sync_dead_letter (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lane TEXT NOT NULL CHECK (lane IN ('content', 'mutation')),
        queue_key TEXT NOT NULL,
        kind TEXT,
        origin_local_id TEXT,
        entity_rev TEXT,
        reason TEXT NOT NULL,
        raw_body TEXT,
        created_at_epoch INTEGER NOT NULL,
        UNIQUE(lane, queue_key, entity_rev, reason)
      )
    `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(44,new Date().toISOString()),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(45,new Date().toISOString())}initializeSyncHubLaunchBaseline(){let G=[{table:"observations",kind:"observation"},{table:"session_summaries",kind:"summary"},{table:"user_prompts",kind:"prompt"}],$=this.db.prepare(`
      SELECT 1 AS present FROM sqlite_master
      WHERE type = 'table' AND name = 'sync_launch_exclusions'
    `).get()!==void 0;this.db.run(`
      CREATE TABLE IF NOT EXISTS sync_launch_exclusions (
        kind TEXT NOT NULL CHECK (kind IN ('observation', 'summary', 'prompt')),
        origin_local_id TEXT NOT NULL,
        through_rev TEXT NOT NULL,
        PRIMARY KEY (kind, origin_local_id)
      )
    `);let Z=this.db.prepare("SELECT version, applied_at FROM schema_versions WHERE version = ?").get(47);if(!Z){let q=Date.now();this.db.transaction(()=>{this.db.run("DELETE FROM sync_launch_exclusions");for(let{table:F,kind:M}of G)this.db.prepare(`
            INSERT INTO sync_launch_exclusions (kind, origin_local_id, through_rev)
            SELECT ?, CAST(id AS TEXT), CAST(sync_rev AS TEXT)
            FROM ${F}
            WHERE origin_device_id IS NULL
          `).run(M),this.db.prepare(`
            UPDATE ${F} SET synced_at = ?
            WHERE synced_at IS NULL AND origin_device_id IS NULL
          `).run(q);this.db.run("DELETE FROM sync_outbox"),this.db.run("DELETE FROM sync_content_outbox"),this.db.run("DELETE FROM sync_dead_letter"),this.db.run("DELETE FROM sync_state");let J=new Date(q).toISOString();this.db.prepare("INSERT INTO schema_versions (version, applied_at) VALUES (?, ?)").run(47,J),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(48,J)})();return}if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(48)&&$)return;let V=Date.parse(Z.applied_at);if(!Number.isSafeInteger(V)||V<0)throw Error(`schema v48: invalid v47 applied_at ${Z.applied_at}`);this.db.transaction(()=>{for(let{table:q,kind:Y}of G)this.db.prepare(`
          INSERT OR IGNORE INTO sync_launch_exclusions (kind, origin_local_id, through_rev)
          SELECT ?, CAST(id AS TEXT), CAST(sync_rev AS TEXT)
          FROM ${q}
          WHERE origin_device_id IS NULL
            AND synced_at > 0
            AND synced_at <= ?
        `).run(Y,V);this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(48,new Date().toISOString())})()}normalizeConceptTags(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(49))return;let $=0;this.db.transaction(()=>{let K=this.db.prepare(`
        SELECT CAST(id AS TEXT) AS id, origin_device_id, CAST(sync_rev AS TEXT) AS sync_rev
        FROM observations
        WHERE concepts LIKE '%:%' AND json_valid(concepts)
      `).all();$=K.length,this.db.run(`
        UPDATE observations
        SET concepts = (
          SELECT json_group_array(
            CASE WHEN instr(value, ':') > 0
                 THEN trim(substr(value, 1, instr(value, ':') - 1))
                 ELSE value END)
          FROM json_each(observations.concepts))
        WHERE concepts LIKE '%:%' AND json_valid(concepts)
      `);for(let V of K){if(V.origin_device_id!==null)continue;let X=n(V.sync_rev);this.db.prepare(`
          UPDATE observations SET sync_rev = ?, synced_at = NULL
          WHERE id = ? AND origin_device_id IS NULL
        `).run(X,V.id)}this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(49,new Date().toISOString())})(),W.debug("DB",`Normalized prefixed concept tags in ${$} observations (v49)`)}dropDeadPendingMessagesColumns(){let G=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(31),$=this.db.query("PRAGMA table_info(pending_messages)").all(),Z=new Set($.map((X)=>X.name)),V=["retry_count","failed_at_epoch","completed_at_epoch"].filter((X)=>Z.has(X));if(G&&V.length===0)return;if(V.length>0){this.db.run("BEGIN TRANSACTION");try{this.db.run("DELETE FROM pending_messages WHERE status NOT IN ('pending', 'processing')");for(let X of V)this.db.run(`ALTER TABLE pending_messages DROP COLUMN ${X}`),W.debug("DB",`Dropped dead column ${X} from pending_messages`);if(!G)this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(31,new Date().toISOString());this.db.run("COMMIT")}catch(X){this.db.run("ROLLBACK"),W.warn("DB","Failed to drop dead columns from pending_messages",{},X instanceof Error?X:Error(String(X)));return}return}if(!G)this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(31,new Date().toISOString())}initializeSchema(){this.db.run(`
      CREATE TABLE IF NOT EXISTS schema_versions (
        id INTEGER PRIMARY KEY,
        version INTEGER UNIQUE NOT NULL,
        applied_at TEXT NOT NULL
      )
    `),this.db.run(`
      CREATE TABLE IF NOT EXISTS sdk_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content_session_id TEXT NOT NULL,
        memory_session_id TEXT UNIQUE,
        project TEXT NOT NULL,
        platform_source TEXT NOT NULL DEFAULT 'claude',
        user_prompt TEXT,
        started_at TEXT NOT NULL,
        started_at_epoch INTEGER NOT NULL,
        completed_at TEXT,
        completed_at_epoch INTEGER,
        status TEXT CHECK(status IN ('active', 'completed', 'failed')) NOT NULL DEFAULT 'active'
      );

      CREATE INDEX IF NOT EXISTS idx_sdk_sessions_claude_id ON sdk_sessions(content_session_id);
      CREATE INDEX IF NOT EXISTS idx_sdk_sessions_sdk_id ON sdk_sessions(memory_session_id);
      CREATE INDEX IF NOT EXISTS idx_sdk_sessions_project ON sdk_sessions(project);
      CREATE INDEX IF NOT EXISTS idx_sdk_sessions_status ON sdk_sessions(status);
      CREATE INDEX IF NOT EXISTS idx_sdk_sessions_started ON sdk_sessions(started_at_epoch DESC);

      CREATE TABLE IF NOT EXISTS observations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        memory_session_id TEXT NOT NULL,
        project TEXT NOT NULL,
        text TEXT NOT NULL,
        type TEXT NOT NULL,
        created_at TEXT NOT NULL,
        created_at_epoch INTEGER NOT NULL,
        FOREIGN KEY(memory_session_id) REFERENCES sdk_sessions(memory_session_id) ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_observations_sdk_session ON observations(memory_session_id);
      CREATE INDEX IF NOT EXISTS idx_observations_project ON observations(project);
      CREATE INDEX IF NOT EXISTS idx_observations_type ON observations(type);
      CREATE INDEX IF NOT EXISTS idx_observations_created ON observations(created_at_epoch DESC);

      CREATE TABLE IF NOT EXISTS session_summaries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        memory_session_id TEXT UNIQUE NOT NULL,
        project TEXT NOT NULL,
        request TEXT,
        investigated TEXT,
        learned TEXT,
        completed TEXT,
        next_steps TEXT,
        files_read TEXT,
        files_edited TEXT,
        notes TEXT,
        created_at TEXT NOT NULL,
        created_at_epoch INTEGER NOT NULL,
        FOREIGN KEY(memory_session_id) REFERENCES sdk_sessions(memory_session_id) ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_session_summaries_sdk_session ON session_summaries(memory_session_id);
      CREATE INDEX IF NOT EXISTS idx_session_summaries_project ON session_summaries(project);
      CREATE INDEX IF NOT EXISTS idx_session_summaries_created ON session_summaries(created_at_epoch DESC);
    `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(4,new Date().toISOString())}ensureWorkerPortColumn(){if(!this.db.query("PRAGMA table_info(sdk_sessions)").all().some((Z)=>Z.name==="worker_port"))this.db.run("ALTER TABLE sdk_sessions ADD COLUMN worker_port INTEGER"),W.debug("DB","Added worker_port column to sdk_sessions table");this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(5,new Date().toISOString())}ensurePromptTrackingColumns(){if(!this.db.query("PRAGMA table_info(sdk_sessions)").all().some((q)=>q.name==="prompt_counter"))this.db.run("ALTER TABLE sdk_sessions ADD COLUMN prompt_counter INTEGER DEFAULT 0"),W.debug("DB","Added prompt_counter column to sdk_sessions table");if(!this.db.query("PRAGMA table_info(observations)").all().some((q)=>q.name==="prompt_number"))this.db.run("ALTER TABLE observations ADD COLUMN prompt_number INTEGER"),W.debug("DB","Added prompt_number column to observations table");if(!this.db.query("PRAGMA table_info(session_summaries)").all().some((q)=>q.name==="prompt_number"))this.db.run("ALTER TABLE session_summaries ADD COLUMN prompt_number INTEGER"),W.debug("DB","Added prompt_number column to session_summaries table");this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(6,new Date().toISOString())}repairOrphanedSessionParents(G){let $=this.db.prepare(`
      SELECT COUNT(DISTINCT c.memory_session_id) AS n
      FROM ${G} c
      WHERE c.memory_session_id IS NOT NULL
        AND NOT EXISTS (SELECT 1 FROM sdk_sessions s WHERE s.memory_session_id = c.memory_session_id)
    `).get().n;if($===0)return;this.db.run(`
      INSERT INTO sdk_sessions
        (content_session_id, memory_session_id, project, started_at, started_at_epoch, status)
      SELECT
        c.memory_session_id,
        c.memory_session_id,
        MIN(c.project),
        MIN(c.created_at),
        MIN(c.created_at_epoch),
        'completed'
      FROM ${G} c
      WHERE c.memory_session_id IS NOT NULL
        AND NOT EXISTS (SELECT 1 FROM sdk_sessions s WHERE s.memory_session_id = c.memory_session_id)
      GROUP BY c.memory_session_id
      ON CONFLICT DO NOTHING
    `),W.warn("DB",`Created ${$} stub sdk_sessions parent(s) for orphaned ${G} rows before rebuild (#3378)`)}removeSessionSummariesUniqueConstraint(){if(!this.db.query("PRAGMA index_list(session_summaries)").all().some((Z)=>Z.unique===1&&Z.origin==="u")){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(7,new Date().toISOString());return}W.debug("DB","Removing UNIQUE constraint from session_summaries.memory_session_id"),this.db.run("BEGIN TRANSACTION"),this.repairOrphanedSessionParents("session_summaries"),this.db.run("DROP TABLE IF EXISTS session_summaries_new"),this.db.run(`
      CREATE TABLE session_summaries_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        memory_session_id TEXT NOT NULL,
        project TEXT NOT NULL,
        request TEXT,
        investigated TEXT,
        learned TEXT,
        completed TEXT,
        next_steps TEXT,
        files_read TEXT,
        files_edited TEXT,
        notes TEXT,
        prompt_number INTEGER,
        created_at TEXT NOT NULL,
        created_at_epoch INTEGER NOT NULL,
        FOREIGN KEY(memory_session_id) REFERENCES sdk_sessions(memory_session_id) ON DELETE CASCADE
      )
    `),this.db.run(`
      INSERT INTO session_summaries_new
      SELECT id, memory_session_id, project, request, investigated, learned,
             completed, next_steps, files_read, files_edited, notes,
             prompt_number, created_at, created_at_epoch
      FROM session_summaries
    `),this.db.run("DROP TABLE session_summaries"),this.db.run("ALTER TABLE session_summaries_new RENAME TO session_summaries"),this.db.run(`
      CREATE INDEX idx_session_summaries_sdk_session ON session_summaries(memory_session_id);
      CREATE INDEX idx_session_summaries_project ON session_summaries(project);
      CREATE INDEX idx_session_summaries_created ON session_summaries(created_at_epoch DESC);
    `),this.db.run("COMMIT"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(7,new Date().toISOString()),W.debug("DB","Successfully removed UNIQUE constraint from session_summaries.memory_session_id")}addObservationHierarchicalFields(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(8))return;if(this.db.query("PRAGMA table_info(observations)").all().some((K)=>K.name==="title")){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(8,new Date().toISOString());return}W.debug("DB","Adding hierarchical fields to observations table"),this.db.run(`
      ALTER TABLE observations ADD COLUMN title TEXT;
      ALTER TABLE observations ADD COLUMN subtitle TEXT;
      ALTER TABLE observations ADD COLUMN facts TEXT;
      ALTER TABLE observations ADD COLUMN narrative TEXT;
      ALTER TABLE observations ADD COLUMN concepts TEXT;
      ALTER TABLE observations ADD COLUMN files_read TEXT;
      ALTER TABLE observations ADD COLUMN files_modified TEXT;
    `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(8,new Date().toISOString()),W.debug("DB","Successfully added hierarchical fields to observations table")}makeObservationsTextNullable(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(9))return;let Z=this.db.query("PRAGMA table_info(observations)").all().find((K)=>K.name==="text");if(!Z||Z.notnull===0){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(9,new Date().toISOString());return}W.debug("DB","Making observations.text nullable"),this.db.run("BEGIN TRANSACTION"),this.repairOrphanedSessionParents("observations"),this.db.run("DROP TABLE IF EXISTS observations_new"),this.db.run(`
      CREATE TABLE observations_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        memory_session_id TEXT NOT NULL,
        project TEXT NOT NULL,
        text TEXT,
        type TEXT NOT NULL,
        title TEXT,
        subtitle TEXT,
        facts TEXT,
        narrative TEXT,
        concepts TEXT,
        files_read TEXT,
        files_modified TEXT,
        prompt_number INTEGER,
        created_at TEXT NOT NULL,
        created_at_epoch INTEGER NOT NULL,
        FOREIGN KEY(memory_session_id) REFERENCES sdk_sessions(memory_session_id) ON DELETE CASCADE
      )
    `),this.db.run(`
      INSERT INTO observations_new
      SELECT id, memory_session_id, project, text, type, title, subtitle, facts,
             narrative, concepts, files_read, files_modified, prompt_number,
             created_at, created_at_epoch
      FROM observations
    `),this.db.run("DROP TABLE observations"),this.db.run("ALTER TABLE observations_new RENAME TO observations"),this.db.run(`
      CREATE INDEX idx_observations_sdk_session ON observations(memory_session_id);
      CREATE INDEX idx_observations_project ON observations(project);
      CREATE INDEX idx_observations_type ON observations(type);
      CREATE INDEX idx_observations_created ON observations(created_at_epoch DESC);
    `),this.db.run("COMMIT"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(9,new Date().toISOString()),W.debug("DB","Successfully made observations.text nullable")}createUserPromptsTable(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(10))return;if(this.db.query("PRAGMA table_info(user_prompts)").all().length>0){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(10,new Date().toISOString());return}W.debug("DB","Creating user_prompts table with FTS5 support"),this.db.run("BEGIN TRANSACTION"),this.db.run(`
      CREATE TABLE user_prompts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_db_id INTEGER,
        content_session_id TEXT NOT NULL,
        prompt_number INTEGER NOT NULL,
        prompt_text TEXT NOT NULL,
        created_at TEXT NOT NULL,
        created_at_epoch INTEGER NOT NULL,
        FOREIGN KEY(session_db_id) REFERENCES sdk_sessions(id) ON DELETE CASCADE
      );

      CREATE INDEX idx_user_prompts_session ON user_prompts(session_db_id);
      CREATE INDEX idx_user_prompts_claude_session ON user_prompts(content_session_id);
      CREATE INDEX idx_user_prompts_created ON user_prompts(created_at_epoch DESC);
      CREATE INDEX idx_user_prompts_prompt_number ON user_prompts(prompt_number);
      CREATE INDEX idx_user_prompts_lookup ON user_prompts(session_db_id, prompt_number);
      CREATE INDEX idx_user_prompts_content_lookup ON user_prompts(content_session_id, prompt_number);
    `);let Z=`
      CREATE VIRTUAL TABLE user_prompts_fts USING fts5(
        prompt_text,
        content='user_prompts',
        content_rowid='id'
      );
    `,K=`
      CREATE TRIGGER user_prompts_ai AFTER INSERT ON user_prompts BEGIN
        INSERT INTO user_prompts_fts(rowid, prompt_text)
        VALUES (new.id, new.prompt_text);
      END;

      CREATE TRIGGER user_prompts_ad AFTER DELETE ON user_prompts BEGIN
        INSERT INTO user_prompts_fts(user_prompts_fts, rowid, prompt_text)
        VALUES('delete', old.id, old.prompt_text);
      END;

      CREATE TRIGGER user_prompts_au AFTER UPDATE ON user_prompts BEGIN
        INSERT INTO user_prompts_fts(user_prompts_fts, rowid, prompt_text)
        VALUES('delete', old.id, old.prompt_text);
        INSERT INTO user_prompts_fts(rowid, prompt_text)
        VALUES (new.id, new.prompt_text);
      END;
    `;try{this.db.run(Z),this.db.run(K)}catch(V){if(V instanceof Error)W.warn("DB","FTS5 not available — user_prompts_fts skipped (search uses ChromaDB)",{},V);else W.warn("DB","FTS5 not available — user_prompts_fts skipped (search uses ChromaDB)",{},Error(String(V)));this.db.run("COMMIT"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(10,new Date().toISOString()),W.debug("DB","Created user_prompts table (without FTS5)");return}this.db.run("COMMIT"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(10,new Date().toISOString()),W.debug("DB","Successfully created user_prompts table")}ensureDiscoveryTokensColumn(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(11))return;if(!this.db.query("PRAGMA table_info(observations)").all().some((X)=>X.name==="discovery_tokens"))this.db.run("ALTER TABLE observations ADD COLUMN discovery_tokens INTEGER DEFAULT 0"),W.debug("DB","Added discovery_tokens column to observations table");if(!this.db.query("PRAGMA table_info(session_summaries)").all().some((X)=>X.name==="discovery_tokens"))this.db.run("ALTER TABLE session_summaries ADD COLUMN discovery_tokens INTEGER DEFAULT 0"),W.debug("DB","Added discovery_tokens column to session_summaries table");this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(11,new Date().toISOString())}createPendingMessagesTable(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(16))return;if(this.db.query("SELECT name FROM sqlite_master WHERE type='table' AND name='pending_messages'").all().length>0){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(16,new Date().toISOString());return}W.debug("DB","Creating pending_messages table"),this.db.run(`
      CREATE TABLE pending_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_db_id INTEGER NOT NULL,
        content_session_id TEXT NOT NULL,
        message_type TEXT NOT NULL CHECK(message_type IN ('observation', 'summarize')),
        tool_name TEXT,
        tool_input TEXT,
        tool_response TEXT,
        cwd TEXT,
        last_user_message TEXT,
        last_assistant_message TEXT,
        prompt_number INTEGER,
        status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'processing')),
        created_at_epoch INTEGER NOT NULL,
        FOREIGN KEY (session_db_id) REFERENCES sdk_sessions(id) ON DELETE CASCADE
      )
    `),this.db.run("CREATE INDEX IF NOT EXISTS idx_pending_messages_session ON pending_messages(session_db_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_pending_messages_status ON pending_messages(status)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_pending_messages_claude_session ON pending_messages(content_session_id)"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(16,new Date().toISOString()),W.debug("DB","pending_messages table created successfully")}renameSessionIdColumns(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(17))return;W.debug("DB","Checking session ID columns for semantic clarity rename");let $=0,Z=(K,V,X)=>{let q=this.db.query(`PRAGMA table_info(${K})`).all(),Y=q.some((F)=>F.name===V);if(q.some((F)=>F.name===X))return!1;if(Y)return this.db.run(`ALTER TABLE ${K} RENAME COLUMN ${V} TO ${X}`),W.debug("DB",`Renamed ${K}.${V} to ${X}`),!0;return W.warn("DB",`Column ${V} not found in ${K}, skipping rename`),!1};if(Z("sdk_sessions","claude_session_id","content_session_id"))$++;if(Z("sdk_sessions","sdk_session_id","memory_session_id"))$++;if(Z("pending_messages","claude_session_id","content_session_id"))$++;if(Z("observations","sdk_session_id","memory_session_id"))$++;if(Z("session_summaries","sdk_session_id","memory_session_id"))$++;if(Z("user_prompts","claude_session_id","content_session_id"))$++;if(this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(17,new Date().toISOString()),$>0)W.debug("DB",`Successfully renamed ${$} session ID columns`);else W.debug("DB","No session ID column renames needed (already up to date)")}addFailedAtEpochColumn(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(20))return;if(!this.db.query("PRAGMA table_info(pending_messages)").all().some((K)=>K.name==="failed_at_epoch"))this.db.run("ALTER TABLE pending_messages ADD COLUMN failed_at_epoch INTEGER"),W.debug("DB","Added failed_at_epoch column to pending_messages table");this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(20,new Date().toISOString())}addOnUpdateCascadeToForeignKeys(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(21))return;W.debug("DB","Adding ON UPDATE CASCADE to FK constraints on observations and session_summaries"),this.db.run("PRAGMA foreign_keys = OFF"),this.db.run("BEGIN TRANSACTION"),this.db.run("DROP TRIGGER IF EXISTS observations_ai"),this.db.run("DROP TRIGGER IF EXISTS observations_ad"),this.db.run("DROP TRIGGER IF EXISTS observations_au"),this.db.run("DROP TABLE IF EXISTS observations_new");let $=this.db.query("PRAGMA table_info(observations)").all(),Z=$.some((O)=>O.name==="metadata"),K=$.some((O)=>O.name==="content_hash"),V=Z?`,
        metadata TEXT`:"",X=Z?", metadata":"",q=K?`,
        content_hash TEXT`:"",Y=K?", content_hash":"",J=`
      CREATE TABLE observations_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        memory_session_id TEXT NOT NULL,
        project TEXT NOT NULL,
        text TEXT,
        type TEXT NOT NULL,
        title TEXT,
        subtitle TEXT,
        facts TEXT,
        narrative TEXT,
        concepts TEXT,
        files_read TEXT,
        files_modified TEXT,
        prompt_number INTEGER,
        discovery_tokens INTEGER DEFAULT 0,
        created_at TEXT NOT NULL,
        created_at_epoch INTEGER NOT NULL${V}${q},
        FOREIGN KEY(memory_session_id) REFERENCES sdk_sessions(memory_session_id) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `,F=`
      INSERT INTO observations_new
      SELECT id, memory_session_id, project, text, type, title, subtitle, facts,
             narrative, concepts, files_read, files_modified, prompt_number,
             discovery_tokens, created_at, created_at_epoch${X}${Y}
      FROM observations
    `,M=`
      CREATE INDEX idx_observations_sdk_session ON observations(memory_session_id);
      CREATE INDEX idx_observations_project ON observations(project);
      CREATE INDEX idx_observations_type ON observations(type);
      CREATE INDEX idx_observations_created ON observations(created_at_epoch DESC);
    `,H=`
      CREATE TRIGGER IF NOT EXISTS observations_ai AFTER INSERT ON observations BEGIN
        INSERT INTO observations_fts(rowid, title, subtitle, narrative, text, facts, concepts)
        VALUES (new.id, new.title, new.subtitle, new.narrative, new.text, new.facts, new.concepts);
      END;

      CREATE TRIGGER IF NOT EXISTS observations_ad AFTER DELETE ON observations BEGIN
        INSERT INTO observations_fts(observations_fts, rowid, title, subtitle, narrative, text, facts, concepts)
        VALUES('delete', old.id, old.title, old.subtitle, old.narrative, old.text, old.facts, old.concepts);
      END;

      CREATE TRIGGER IF NOT EXISTS observations_au AFTER UPDATE ON observations BEGIN
        INSERT INTO observations_fts(observations_fts, rowid, title, subtitle, narrative, text, facts, concepts)
        VALUES('delete', old.id, old.title, old.subtitle, old.narrative, old.text, old.facts, old.concepts);
        INSERT INTO observations_fts(rowid, title, subtitle, narrative, text, facts, concepts)
        VALUES (new.id, new.title, new.subtitle, new.narrative, new.text, new.facts, new.concepts);
      END;
    `;this.db.run("DROP TRIGGER IF EXISTS session_summaries_ai"),this.db.run("DROP TRIGGER IF EXISTS session_summaries_ad"),this.db.run("DROP TRIGGER IF EXISTS session_summaries_au"),this.db.run("DROP TABLE IF EXISTS session_summaries_new");let A=`
      CREATE TABLE session_summaries_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        memory_session_id TEXT NOT NULL,
        project TEXT NOT NULL,
        request TEXT,
        investigated TEXT,
        learned TEXT,
        completed TEXT,
        next_steps TEXT,
        files_read TEXT,
        files_edited TEXT,
        notes TEXT,
        prompt_number INTEGER,
        discovery_tokens INTEGER DEFAULT 0,
        created_at TEXT NOT NULL,
        created_at_epoch INTEGER NOT NULL,
        FOREIGN KEY(memory_session_id) REFERENCES sdk_sessions(memory_session_id) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `,w=`
      INSERT INTO session_summaries_new
      SELECT id, memory_session_id, project, request, investigated, learned,
             completed, next_steps, files_read, files_edited, notes,
             prompt_number, discovery_tokens, created_at, created_at_epoch
      FROM session_summaries
    `,L=`
      CREATE INDEX idx_session_summaries_sdk_session ON session_summaries(memory_session_id);
      CREATE INDEX idx_session_summaries_project ON session_summaries(project);
      CREATE INDEX idx_session_summaries_created ON session_summaries(created_at_epoch DESC);
    `,z=`
      CREATE TRIGGER IF NOT EXISTS session_summaries_ai AFTER INSERT ON session_summaries BEGIN
        INSERT INTO session_summaries_fts(rowid, request, investigated, learned, completed, next_steps, notes)
        VALUES (new.id, new.request, new.investigated, new.learned, new.completed, new.next_steps, new.notes);
      END;

      CREATE TRIGGER IF NOT EXISTS session_summaries_ad AFTER DELETE ON session_summaries BEGIN
        INSERT INTO session_summaries_fts(session_summaries_fts, rowid, request, investigated, learned, completed, next_steps, notes)
        VALUES('delete', old.id, old.request, old.investigated, old.learned, old.completed, old.next_steps, old.notes);
      END;

      CREATE TRIGGER IF NOT EXISTS session_summaries_au AFTER UPDATE ON session_summaries BEGIN
        INSERT INTO session_summaries_fts(session_summaries_fts, rowid, request, investigated, learned, completed, next_steps, notes)
        VALUES('delete', old.id, old.request, old.investigated, old.learned, old.completed, old.next_steps, old.notes);
        INSERT INTO session_summaries_fts(rowid, request, investigated, learned, completed, next_steps, notes)
        VALUES (new.id, new.request, new.investigated, new.learned, new.completed, new.next_steps, new.notes);
      END;
    `;try{this.recreateObservationsWithCascade(J,F,M,H),this.recreateSessionSummariesWithCascade(A,w,L,z),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(21,new Date().toISOString()),this.db.run("COMMIT"),this.db.run("PRAGMA foreign_keys = ON"),W.debug("DB","Successfully added ON UPDATE CASCADE to FK constraints")}catch(O){if(this.db.run("ROLLBACK"),this.db.run("PRAGMA foreign_keys = ON"),O instanceof Error)throw O;throw Error(String(O))}}recreateObservationsWithCascade(G,$,Z,K){if(this.db.run(G),this.db.run($),this.db.run("DROP TABLE observations"),this.db.run("ALTER TABLE observations_new RENAME TO observations"),this.db.run(Z),this.db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='observations_fts'").all().length>0)this.db.run(K)}recreateSessionSummariesWithCascade(G,$,Z,K){if(this.db.run(G),this.db.run($),this.db.run("DROP TABLE session_summaries"),this.db.run("ALTER TABLE session_summaries_new RENAME TO session_summaries"),this.db.run(Z),this.db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='session_summaries_fts'").all().length>0)this.db.run(K)}addObservationContentHashColumn(){if(this.db.query("PRAGMA table_info(observations)").all().some((Z)=>Z.name==="content_hash")){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(22,new Date().toISOString());return}this.db.run("ALTER TABLE observations ADD COLUMN content_hash TEXT"),this.db.run("UPDATE observations SET content_hash = substr(hex(randomblob(8)), 1, 16) WHERE content_hash IS NULL"),this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_content_hash ON observations(content_hash, created_at_epoch)"),W.debug("DB","Added content_hash column to observations table with backfill and index"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(22,new Date().toISOString())}addSessionCustomTitleColumn(){let G=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(23),Z=this.db.query("PRAGMA table_info(sdk_sessions)").all().some((K)=>K.name==="custom_title");if(G&&Z)return;if(!Z)this.db.run("ALTER TABLE sdk_sessions ADD COLUMN custom_title TEXT"),W.debug("DB","Added custom_title column to sdk_sessions table");if(!G)this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(23,new Date().toISOString())}addSessionPlatformSourceColumn(){let $=this.db.query("PRAGMA table_info(sdk_sessions)").all().some((X)=>X.name==="platform_source"),K=this.db.query("PRAGMA index_list(sdk_sessions)").all().some((X)=>X.name==="idx_sdk_sessions_platform_source");if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(24)&&$&&K)return;if(!$)this.db.run(`ALTER TABLE sdk_sessions ADD COLUMN platform_source TEXT NOT NULL DEFAULT '${U}'`),W.debug("DB","Added platform_source column to sdk_sessions table");if(this.db.run(`
      UPDATE sdk_sessions
      SET platform_source = '${U}'
      WHERE platform_source IS NULL OR platform_source = ''
    `),!K)this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_platform_source ON sdk_sessions(platform_source)");this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(24,new Date().toISOString())}addObservationModelColumns(){let G=this.db.query("PRAGMA table_info(observations)").all(),$=G.some((K)=>K.name==="generated_by_model"),Z=G.some((K)=>K.name==="relevance_count");if($&&Z)return;if(!$)this.db.run("ALTER TABLE observations ADD COLUMN generated_by_model TEXT");if(!Z)this.db.run("ALTER TABLE observations ADD COLUMN relevance_count INTEGER DEFAULT 0");this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(26,new Date().toISOString())}addObservationRecallStatsColumns(){let G=this.db.query("PRAGMA table_info(observations)").all(),$=G.some((V)=>V.name==="recall_count"),Z=G.some((V)=>V.name==="last_recalled_at_epoch"),K=G.some((V)=>V.name==="last_recall_source");if($&&Z&&K)return;if(!$)this.db.run("ALTER TABLE observations ADD COLUMN recall_count INTEGER DEFAULT 0");if(!Z)this.db.run("ALTER TABLE observations ADD COLUMN last_recalled_at_epoch INTEGER");if(!K)this.db.run("ALTER TABLE observations ADD COLUMN last_recall_source TEXT");this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(50,new Date().toISOString()),W.debug("DB","Added observation recall stats columns (v50)")}ensureMergedIntoProjectColumns(){if(!this.db.query("PRAGMA table_info(observations)").all().some((Z)=>Z.name==="merged_into_project"))this.db.run("ALTER TABLE observations ADD COLUMN merged_into_project TEXT");if(this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_merged_into ON observations(merged_into_project)"),!this.db.query("PRAGMA table_info(session_summaries)").all().some((Z)=>Z.name==="merged_into_project"))this.db.run("ALTER TABLE session_summaries ADD COLUMN merged_into_project TEXT");this.db.run("CREATE INDEX IF NOT EXISTS idx_summaries_merged_into ON session_summaries(merged_into_project)")}addObservationSubagentColumns(){let G=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(27),$=this.db.query("PRAGMA table_info(observations)").all(),Z=$.some((X)=>X.name==="agent_type"),K=$.some((X)=>X.name==="agent_id");if(!Z)this.db.run("ALTER TABLE observations ADD COLUMN agent_type TEXT");if(!K)this.db.run("ALTER TABLE observations ADD COLUMN agent_id TEXT");this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_agent_type ON observations(agent_type)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_agent_id ON observations(agent_id)");let V=this.db.query("PRAGMA table_info(pending_messages)").all();if(V.length>0){let X=V.some((Y)=>Y.name==="agent_type"),q=V.some((Y)=>Y.name==="agent_id");if(!X)this.db.run("ALTER TABLE pending_messages ADD COLUMN agent_type TEXT");if(!q)this.db.run("ALTER TABLE pending_messages ADD COLUMN agent_id TEXT")}if(!G)this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(27,new Date().toISOString())}ensurePendingMessagesToolUseIdColumn(){if(this.db.query("SELECT name FROM sqlite_master WHERE type='table' AND name='pending_messages'").all().length===0){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(28,new Date().toISOString());return}if(!this.db.query("PRAGMA table_info(pending_messages)").all().some((K)=>K.name==="tool_use_id"))this.db.run("ALTER TABLE pending_messages ADD COLUMN tool_use_id TEXT");this.db.run("BEGIN TRANSACTION");try{this.dedupePendingMessagesByToolUseId(),this.db.run("COMMIT")}catch(K){this.db.run("ROLLBACK");let V=K instanceof Error?K:Error(String(K));throw W.error("DB","Failed to de-dupe pending_messages by tool_use_id, rolled back",{},V),K}}dedupePendingMessagesByToolUseId(){this.db.run(`
      DELETE FROM pending_messages
       WHERE id IN (
         SELECT id
           FROM (
             SELECT id,
                    ROW_NUMBER() OVER (
                      PARTITION BY session_db_id, tool_use_id
                      ORDER BY CASE status
                        WHEN 'processing' THEN 0
                        WHEN 'pending' THEN 1
                        ELSE 2
                      END, id
                    ) AS duplicate_rank
               FROM pending_messages
              WHERE tool_use_id IS NOT NULL
           )
          WHERE duplicate_rank > 1
         )
    `),this.db.run(`
      -- tool_use_id is optional for summaries and legacy rows; enforce de-dupe
      -- only for rows that came from a concrete tool-use event.
      CREATE UNIQUE INDEX IF NOT EXISTS ux_pending_session_tool
      ON pending_messages(session_db_id, tool_use_id)
      WHERE tool_use_id IS NOT NULL
    `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(28,new Date().toISOString())}addObservationsUniqueContentHashIndex(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(29))return;let $=this.db.query("PRAGMA table_info(observations)").all(),Z=$.some((V)=>V.name==="memory_session_id"),K=$.some((V)=>V.name==="content_hash");if(!Z||!K){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(29,new Date().toISOString());return}this.db.run("BEGIN TRANSACTION");try{this.dedupeObservationsByContentHash(),this.db.run("COMMIT")}catch(V){this.db.run("ROLLBACK");let X=V instanceof Error?V:Error(String(V));throw W.error("DB","Failed to de-dupe observations by content_hash, rolled back",{},X),V}}dedupeObservationsByContentHash(){this.db.run(`
      UPDATE observations
         SET content_hash = '__null_migration_' || id || '__'
       WHERE content_hash IS NULL
    `),this.db.run(`
      DELETE FROM observations
       WHERE id IN (
         SELECT id
           FROM (
             SELECT id,
                    ROW_NUMBER() OVER (
                      PARTITION BY memory_session_id, content_hash
                      ORDER BY id
                    ) AS duplicate_rank
               FROM observations
           )
          WHERE duplicate_rank > 1
       )
    `),this.db.run(`
      CREATE UNIQUE INDEX IF NOT EXISTS ux_observations_session_hash
      ON observations(memory_session_id, content_hash)
    `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(29,new Date().toISOString())}addObservationsMetadataColumn(){if(!this.db.query("PRAGMA table_info(observations)").all().some((Z)=>Z.name==="metadata"))this.db.run("ALTER TABLE observations ADD COLUMN metadata TEXT"),W.debug("DB","Added metadata column to observations table (#2116)");this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(30,new Date().toISOString())}updateMemorySessionId(G,$){if(this.db.prepare(`
      UPDATE sdk_sessions
      SET memory_session_id = ?
      WHERE id = ?
    `).run($,G),$)this.requeuePromptSync(G)}enqueueMutationOp(G,$){let Z=JSON.parse(JSON.stringify($));if(Z.op==="set_prompt_session"){let K=Z.target;if(K?.origin_device_id===null)K.origin_device_id="self"}t(Z),this.db.prepare(`
      INSERT INTO sync_outbox (op_uuid, rev, body, created_at_epoch)
      VALUES (?, ?, ?, ?)
    `).run(Q1.randomUUID(),String(G),JSON.stringify($),Date.now())}requeuePromptSync(G){let $=this.db.prepare(`
      SELECT memory_session_id, project, content_session_id, platform_source
      FROM sdk_sessions WHERE id = ?
    `).get(G);if(!$?.memory_session_id)return;this.db.transaction(()=>{let K=this.db.prepare(`
        SELECT CAST(id AS TEXT) AS id, CAST(sync_rev AS TEXT) AS sync_rev FROM user_prompts
        WHERE session_db_id = ? AND origin_device_id IS NULL
      `).all(G);if(K.length===0)return;for(let V of K){let X=n(V.sync_rev);this.db.prepare(`
          UPDATE user_prompts SET sync_rev = ?, synced_at = NULL
          WHERE id = ? AND origin_device_id IS NULL
        `).run(X,V.id),this.enqueueMutationOp(X,{op:"set_prompt_session",target:{origin_device_id:null,origin_local_id:V.id},fields:{memory_session_id:$.memory_session_id,project:$.project,content_session_id:$.content_session_id,platform_source:$.platform_source}})}})()}markSessionCompleted(G){let $=Date.now(),Z=new Date($).toISOString();this.db.prepare(`
      UPDATE sdk_sessions
      SET status = 'completed', completed_at = ?, completed_at_epoch = ?
      WHERE id = ?
    `).run(Z,$,G)}ensureMemorySessionIdRegistered(G,$,Z){let K=this.db.prepare(`
      SELECT id, memory_session_id, worker_port FROM sdk_sessions WHERE id = ?
    `).get(G);if(!K)throw Error(`Session ${G} not found in sdk_sessions`);if(K.memory_session_id!==$)this.db.prepare(`
        UPDATE sdk_sessions SET memory_session_id = ? WHERE id = ?
      `).run($,G),this.requeuePromptSync(G),W.info("DB","Registered memory_session_id before storage (FK fix)",{sessionDbId:G,oldId:K.memory_session_id,newId:$});if(typeof Z==="number"&&K.worker_port!==Z)this.db.prepare(`
        UPDATE sdk_sessions SET worker_port = ? WHERE id = ?
      `).run(Z,G)}getAllProjects(G){let $=G?T(G):void 0,Z=`
      SELECT DISTINCT project
      FROM sdk_sessions
      WHERE project IS NOT NULL AND project != ''
        AND project != ?
    `,K=[c];if($)Z+=" AND COALESCE(platform_source, ?) = ?",K.push(U,$);return Z+=" ORDER BY project ASC",this.db.prepare(Z).all(...K).map((X)=>X.project)}getProjectCatalog(){let G=this.db.prepare(`
      SELECT
        COALESCE(platform_source, '${U}') as platform_source,
        project,
        MAX(started_at_epoch) as latest_epoch
      FROM sdk_sessions
      WHERE project IS NOT NULL AND project != ''
        AND project != ?
      GROUP BY COALESCE(platform_source, '${U}'), project
      ORDER BY latest_epoch DESC
    `).all(c),$=[],Z=new Set,K={};for(let X of G){let q=T(X.platform_source);if(!K[q])K[q]=[];if(!K[q].includes(X.project))K[q].push(X.project);if(!Z.has(X.project))Z.add(X.project),$.push(X.project)}let V=V1(Object.keys(K));return{projects:$,sources:V,projectsBySource:Object.fromEntries(V.map((X)=>[X,K[X]||[]]))}}getLatestUserPrompt(G,$){let Z=this.resolvePromptSessionDbId(G,$),K=Z!==null?"up.session_db_id = ?":"up.content_session_id = ?",V=Z!==null?Z:G;return this.db.prepare(`
      SELECT
        up.*,
        s.memory_session_id,
        s.project,
        COALESCE(s.platform_source, '${U}') as platform_source
      FROM user_prompts up
      JOIN sdk_sessions s ON up.session_db_id = s.id
      WHERE ${K}
      ORDER BY up.created_at_epoch DESC
      LIMIT 1
    `).get(V)}findRecentDuplicateUserPrompt(G,$,Z,K){return q1(this.db,G,h($),Z,this.resolvePromptSessionDbId(G,K)??void 0)}getRecentSessionsWithStatus(G,$=3,Z){let K=[G],V="";if(Z)V=`AND COALESCE(NULLIF(s.platform_source, ''), '${U}') = ?`,K.push(T(Z));return K.push($),this.db.prepare(`
      SELECT * FROM (
        SELECT
          s.memory_session_id,
          s.status,
          s.started_at,
          s.started_at_epoch,
          s.user_prompt,
          CASE WHEN sum.memory_session_id IS NOT NULL THEN 1 ELSE 0 END as has_summary
        FROM sdk_sessions s
        LEFT JOIN session_summaries sum ON s.memory_session_id = sum.memory_session_id
        WHERE s.project = ? AND s.memory_session_id IS NOT NULL
        ${V}
        GROUP BY s.memory_session_id
        ORDER BY s.started_at_epoch DESC
        LIMIT ?
      )
      ORDER BY started_at_epoch ASC
    `).all(...K)}getObservationsForSession(G,$){let Z=[G],K="";if($)K=`
        AND EXISTS (
          SELECT 1
          FROM sdk_sessions s
          WHERE s.memory_session_id = observations.memory_session_id
            AND COALESCE(NULLIF(s.platform_source, ''), '${U}') = ?
        )
      `,Z.push(T($));return this.db.prepare(`
      SELECT title, subtitle, type, prompt_number
      FROM observations
      WHERE memory_session_id = ?
      ${K}
      ORDER BY created_at_epoch ASC
    `).all(...Z)}getObservationById(G,$){if(!$)return this.db.prepare(`
        SELECT *
        FROM observations
        WHERE id = ?
      `).get(G)||null;return this.db.prepare(`
      SELECT o.*
      FROM observations o
      LEFT JOIN sdk_sessions s ON s.memory_session_id = o.memory_session_id
      WHERE o.id = ?
        AND COALESCE(NULLIF(s.platform_source, ''), '${U}') = ?
    `).get(G,T($))||null}getObservationsByIds(G,$={}){if(G.length===0)return[];let{orderBy:Z="date_desc",limit:K,project:V,platformSource:X,type:q,concepts:Y,files:J}=$,F=Z==="relevance",M=F?"":`ORDER BY o.created_at_epoch ${Z==="date_asc"?"ASC":"DESC"}`,H=K&&!F?`LIMIT ${K}`:"",A=G.map(()=>"?").join(","),w=[...G],L=[];if(V)L.push("(o.project = ? OR o.merged_into_project = ?)"),w.push(V,V);if(X)L.push(`COALESCE(NULLIF(s.platform_source, ''), '${U}') = ?`),w.push(T(X));if(q)if(Array.isArray(q)){let N=q.map(()=>"?").join(",");L.push(`o.type IN (${N})`),w.push(...q)}else L.push("o.type = ?"),w.push(q);if(Y){let N=Array.isArray(Y)?Y:[Y],B=N.map(()=>"EXISTS (SELECT 1 FROM json_each(o.concepts) WHERE value = ?)");w.push(...N),L.push(`(${B.join(" OR ")})`)}if(J){let N=Array.isArray(J)?J:[J],B=N.map(()=>{return"(EXISTS (SELECT 1 FROM json_each(o.files_read) WHERE value LIKE ?) OR EXISTS (SELECT 1 FROM json_each(o.files_modified) WHERE value LIKE ?))"});N.forEach((x)=>{w.push(`%${x}%`,`%${x}%`)}),L.push(`(${B.join(" OR ")})`)}let z=L.length>0?`WHERE o.id IN (${A}) AND ${L.join(" AND ")}`:`WHERE o.id IN (${A})`,R=this.db.prepare(`
      SELECT o.*
      FROM observations o
      LEFT JOIN sdk_sessions s ON s.memory_session_id = o.memory_session_id
      ${z}
      ${M}
      ${H}
    `).all(...w);if(!F)return R;let E=new Map(R.map((N)=>[N.id,N])),Q=G.map((N)=>E.get(N)).filter((N)=>!!N);return K?Q.slice(0,K):Q}recordObservationRecalls(G){if(G.length===0)return 0;let $=this.db.prepare(`
      UPDATE observations
      SET recall_count = COALESCE(recall_count, 0) + ?,
          last_recalled_at_epoch = ?,
          last_recall_source = ?
      WHERE id = ?
    `),Z=0;return this.db.transaction(()=>{for(let V of G){if(!Number.isFinite(V.id)||V.count<=0)continue;let X=$.run(V.count,V.atEpoch,V.source,V.id);Z+=X.changes}})(),Z}getSummaryForSession(G,$){let Z=[G],K="";if($)K=`
        AND EXISTS (
          SELECT 1
          FROM sdk_sessions sdk
          WHERE sdk.memory_session_id = session_summaries.memory_session_id
            AND COALESCE(NULLIF(sdk.platform_source, ''), '${U}') = ?
        )
      `,Z.push(T($));return this.db.prepare(`
      SELECT
        request, investigated, learned, completed, next_steps,
        files_read, files_edited, notes, prompt_number, created_at,
        created_at_epoch
      FROM session_summaries
      WHERE memory_session_id = ?
      ${K}
      ORDER BY created_at_epoch DESC
      LIMIT 1
    `).get(...Z)||null}getSessionById(G){return this.db.prepare(`
      SELECT id, content_session_id, memory_session_id, project,
             COALESCE(platform_source, '${U}') as platform_source,
             user_prompt, custom_title, status
      FROM sdk_sessions
      WHERE id = ?
      LIMIT 1
    `).get(G)||null}getSdkSessionsBySessionIds(G){if(G.length===0)return[];let $=G.map(()=>"?").join(",");return this.db.prepare(`
      SELECT id, content_session_id, memory_session_id, project,
             COALESCE(platform_source, '${U}') as platform_source,
             user_prompt, custom_title,
             started_at, started_at_epoch, completed_at, completed_at_epoch, status
      FROM sdk_sessions
      WHERE memory_session_id IN (${$})
      ORDER BY started_at_epoch DESC
    `).all(...G)}getPromptNumberFromUserPrompts(G,$){let Z=this.resolvePromptSessionDbId(G,$);if(Z!==null)return this.db.prepare(`
        SELECT COUNT(*) as count FROM user_prompts WHERE session_db_id = ?
      `).get(Z).count;return this.db.prepare(`
      SELECT COUNT(*) as count FROM user_prompts WHERE content_session_id = ?
    `).get(G).count}createSDKSession(G,$,Z,K,V){let X=new Date,q=X.getTime(),Y=V?T(V):U,J=h(Z);if(K)this.validateSetTitleMutation(G,Y,K);let F=this.db.prepare(`
      SELECT id, platform_source
      FROM sdk_sessions
      WHERE COALESCE(NULLIF(platform_source, ''), ?) = ?
        AND content_session_id = ?
    `).get(U,Y,G);if(F){if($)this.db.prepare(`
          UPDATE sdk_sessions SET project = ?
          WHERE id = ? AND (project IS NULL OR project = '')
        `).run($,F.id);if(K){let H=this.db.prepare("SELECT custom_title FROM sdk_sessions WHERE id = ?").get(F.id);if(H&&H.custom_title===null)this.db.prepare(`
            UPDATE sdk_sessions SET custom_title = ?
            WHERE id = ? AND custom_title IS NULL
          `).run(K,F.id),this.enqueueSetTitleOp(G,Y,K)}return F.id}let M=this.db.prepare(`
      INSERT INTO sdk_sessions
      (content_session_id, memory_session_id, project, platform_source, user_prompt, custom_title, started_at, started_at_epoch, status)
      VALUES (?, NULL, ?, ?, ?, ?, ?, ?, 'active')
    `).run(G,$,Y,J,K||null,X.toISOString(),q);if(K)this.enqueueSetTitleOp(G,Y,K);return Number(M.lastInsertRowid)}enqueueSetTitleOp(G,$,Z){let K=this.validateSetTitleMutation(G,$,Z);this.enqueueMutationOp("1",K)}validateSetTitleMutation(G,$,Z){let K={op:"set_title",target:{content_session_id:G,platform_source:$},fields:{custom_title:Z}};return t(K),K}saveUserPrompt(G,$,Z,K){let V=new Date,X=V.getTime(),q=h(Z),Y=this.resolvePromptSessionDbId(G,K);return this.db.prepare(`
      INSERT INTO user_prompts
      (session_db_id, content_session_id, prompt_number, prompt_text, created_at, created_at_epoch)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(Y,G,$,q,V.toISOString(),X).lastInsertRowid}getUserPrompt(G,$,Z){let K=this.resolvePromptSessionDbId(G,Z);if(K!==null)return this.db.prepare(`
        SELECT prompt_text
        FROM user_prompts
        WHERE session_db_id = ? AND prompt_number = ?
        LIMIT 1
      `).get(K,$)?.prompt_text??null;return this.db.prepare(`
      SELECT prompt_text
      FROM user_prompts
      WHERE content_session_id = ? AND prompt_number = ?
      LIMIT 1
    `).get(G,$)?.prompt_text??null}storeObservation(G,$,Z,K,V=0,X,q){let Y=this.storeObservations(G,$,[Z],null,K,V,X,q);return{id:Y.observationIds[0],createdAtEpoch:Y.createdAtEpoch}}storeSummary(G,$,Z,K,V=0,X){let q=X??Date.now(),Y=new Date(q).toISOString(),F=this.db.prepare(`
      INSERT INTO session_summaries
      (memory_session_id, project, request, investigated, learned, completed,
       next_steps, notes, prompt_number, discovery_tokens, created_at, created_at_epoch)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(G,$,Z.request,Z.investigated,Z.learned,Z.completed,Z.next_steps,Z.notes,K||null,V,Y,q);return{id:Number(F.lastInsertRowid),createdAtEpoch:q}}storeObservations(G,$,Z,K,V,X=0,q,Y){let J=q??Date.now(),F=new Date(J).toISOString();return this.db.transaction(()=>{let H=[],A=this.db.prepare(`
        INSERT INTO observations
        (memory_session_id, project, type, title, subtitle, facts, narrative, concepts,
         files_read, files_modified, prompt_number, discovery_tokens, agent_type, agent_id, content_hash, created_at, created_at_epoch,
         generated_by_model, metadata)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(memory_session_id, content_hash) DO NOTHING
        RETURNING id
      `),w=this.db.prepare("SELECT id FROM observations WHERE memory_session_id = ? AND content_hash = ?");for(let z of Z){let O=X1(G,z.title,z.narrative),R=A.get(G,$,z.type,z.title,z.subtitle,JSON.stringify(z.facts),z.narrative,JSON.stringify(z.concepts),JSON.stringify(z.files_read),JSON.stringify(z.files_modified),V||null,X,z.agent_type??null,z.agent_id??null,O,F,J,Y||null,z.metadata??null);if(R){H.push(R.id);continue}let E=w.get(G,O);if(!E)throw Error(`storeObservations: ON CONFLICT without existing row for content_hash=${O}`);H.push(E.id)}let L=null;if(K){let O=this.db.prepare(`
          INSERT INTO session_summaries
          (memory_session_id, project, request, investigated, learned, completed,
           next_steps, notes, prompt_number, discovery_tokens, created_at, created_at_epoch)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(G,$,K.request,K.investigated,K.learned,K.completed,K.next_steps,K.notes,V||null,X,F,J);L=Number(O.lastInsertRowid)}return{observationIds:H,summaryId:L,createdAtEpoch:J}})()}getSessionSummariesByIds(G,$={}){if(G.length===0)return[];let{orderBy:Z="date_desc",limit:K,project:V,platformSource:X}=$,q=Z==="relevance",Y=q?"":`ORDER BY ss.created_at_epoch ${Z==="date_asc"?"ASC":"DESC"}`,J=K&&!q?`LIMIT ${K}`:"",F=G.map(()=>"?").join(","),M=[...G],H=[];if(V)H.push("(ss.project = ? OR ss.merged_into_project = ?)"),M.push(V,V);if(X)H.push(`COALESCE(NULLIF(s.platform_source, ''), '${U}') = ?`),M.push(T(X));let A=H.length>0?`AND ${H.join(" AND ")}`:"",L=this.db.prepare(`
      SELECT ss.*
      FROM session_summaries ss
      LEFT JOIN sdk_sessions s ON s.memory_session_id = ss.memory_session_id
      WHERE ss.id IN (${F}) ${A}
      ${Y}
      ${J}
    `).all(...M);if(!q)return L;let z=new Map(L.map((R)=>[R.id,R])),O=G.map((R)=>z.get(R)).filter((R)=>!!R);return K?O.slice(0,K):O}getUserPromptsByIds(G,$={}){if(G.length===0)return[];let{orderBy:Z="date_desc",limit:K,project:V,platformSource:X}=$,q=Z==="relevance",Y=q?"":`ORDER BY up.created_at_epoch ${Z==="date_asc"?"ASC":"DESC"}`,J=K&&!q?`LIMIT ${K}`:"",F=G.map(()=>"?").join(","),M=[...G],H=[];if(V)H.push("s.project = ?"),M.push(V);if(X)H.push(`COALESCE(NULLIF(s.platform_source, ''), '${U}') = ?`),M.push(T(X));let A=H.length>0?`AND ${H.join(" AND ")}`:"",L=this.db.prepare(`
      SELECT
        up.*,
        s.project,
        s.memory_session_id,
        COALESCE(NULLIF(s.platform_source, ''), '${U}') as platform_source
      FROM user_prompts up
      JOIN sdk_sessions s ON up.session_db_id = s.id
      WHERE up.id IN (${F}) ${A}
      ${Y}
      ${J}
    `).all(...M);if(!q)return L;let z=new Map(L.map((R)=>[R.id,R])),O=G.map((R)=>z.get(R)).filter((R)=>!!R);return K?O.slice(0,K):O}getTimelineAroundTimestamp(G,$=10,Z=10,K,V){return this.getTimelineAroundObservation(null,G,$,Z,K,V)}getTimelineAroundObservation(G,$,Z=10,K=10,V,X){let q=X?T(X):void 0,Y=(Q,N,B=!1)=>{let x=[],y=[];if(V)if(B)x.push(`(${Q}.project = ? OR ${Q}.merged_into_project = ?)`),y.push(V,V);else x.push(`${Q}.project = ?`),y.push(V);if(q)x.push(`COALESCE(NULLIF(${N}.platform_source, ''), '${U}') = ?`),y.push(q);return{clause:x.length>0?`AND ${x.join(" AND ")}`:"",params:y}},J=Y("o","src",!0),F=Y("ss","src",!0),M=Y("s","s"),H,A;if(G!==null){let Q=`
        SELECT o.id, o.created_at_epoch
        FROM observations o
        LEFT JOIN sdk_sessions src ON src.memory_session_id = o.memory_session_id
        WHERE o.id <= ? ${J.clause}
        ORDER BY o.id DESC
        LIMIT ?
      `,N=`
        SELECT o.id, o.created_at_epoch
        FROM observations o
        LEFT JOIN sdk_sessions src ON src.memory_session_id = o.memory_session_id
        WHERE o.id >= ? ${J.clause}
        ORDER BY o.id ASC
        LIMIT ?
      `;try{let B=this.db.prepare(Q).all(G,...J.params,Z+1),x=this.db.prepare(N).all(G,...J.params,K+1);if(B.length===0&&x.length===0)return{observations:[],sessions:[],prompts:[]};H=B.length>0?B[B.length-1].created_at_epoch:$,A=x.length>0?x[x.length-1].created_at_epoch:$}catch(B){if(B instanceof Error)W.error("DB","Error getting boundary observations",{project:V},B);else W.error("DB","Error getting boundary observations with non-Error",{},Error(String(B)));return{observations:[],sessions:[],prompts:[]}}}else{let Q=`
        SELECT o.created_at_epoch
        FROM observations o
        LEFT JOIN sdk_sessions src ON src.memory_session_id = o.memory_session_id
        WHERE o.created_at_epoch <= ? ${J.clause}
        ORDER BY o.created_at_epoch DESC
        LIMIT ?
      `,N=`
        SELECT o.created_at_epoch
        FROM observations o
        LEFT JOIN sdk_sessions src ON src.memory_session_id = o.memory_session_id
        WHERE o.created_at_epoch >= ? ${J.clause}
        ORDER BY o.created_at_epoch ASC
        LIMIT ?
      `;try{let B=this.db.prepare(Q).all($,...J.params,Z),x=this.db.prepare(N).all($,...J.params,K+1);if(B.length===0&&x.length===0)return{observations:[],sessions:[],prompts:[]};H=B.length>0?B[B.length-1].created_at_epoch:$,A=x.length>0?x[x.length-1].created_at_epoch:$}catch(B){if(B instanceof Error)W.error("DB","Error getting boundary timestamps",{project:V},B);else W.error("DB","Error getting boundary timestamps with non-Error",{},Error(String(B)));return{observations:[],sessions:[],prompts:[]}}}let w=`
      SELECT o.*
      FROM observations o
      LEFT JOIN sdk_sessions src ON src.memory_session_id = o.memory_session_id
      WHERE o.created_at_epoch >= ? AND o.created_at_epoch <= ? ${J.clause}
      ORDER BY o.created_at_epoch ASC
    `,L=`
      SELECT ss.*
      FROM session_summaries ss
      LEFT JOIN sdk_sessions src ON src.memory_session_id = ss.memory_session_id
      WHERE ss.created_at_epoch >= ? AND ss.created_at_epoch <= ? ${F.clause}
      ORDER BY ss.created_at_epoch ASC
    `,z=`
      SELECT up.*, s.project, s.memory_session_id, COALESCE(NULLIF(s.platform_source, ''), '${U}') as platform_source
      FROM user_prompts up
      JOIN sdk_sessions s ON up.session_db_id = s.id
      WHERE up.created_at_epoch >= ? AND up.created_at_epoch <= ? ${M.clause}
      ORDER BY up.created_at_epoch ASC
    `,O=this.db.prepare(w).all(H,A,...J.params),R=this.db.prepare(L).all(H,A,...F.params),E=this.db.prepare(z).all(H,A,...M.params);return{observations:O,sessions:R.map((Q)=>({id:Q.id,memory_session_id:Q.memory_session_id,project:Q.project,request:Q.request,completed:Q.completed,next_steps:Q.next_steps,created_at:Q.created_at,created_at_epoch:Q.created_at_epoch})),prompts:E.map((Q)=>({id:Q.id,content_session_id:Q.content_session_id,prompt_number:Q.prompt_number,prompt_text:Q.prompt_text,project:Q.project,platform_source:Q.platform_source,created_at:Q.created_at,created_at_epoch:Q.created_at_epoch}))}}getOrCreateManualSession(G){let $=`manual-${G}`,Z=`manual-content-${G}`;if(this.db.prepare("SELECT memory_session_id FROM sdk_sessions WHERE memory_session_id = ?").get($))return $;let V=new Date;return this.db.prepare(`
      INSERT INTO sdk_sessions (memory_session_id, content_session_id, project, platform_source, started_at, started_at_epoch, status)
      VALUES (?, ?, ?, ?, ?, ?, 'active')
    `).run($,Z,G,U,V.toISOString(),V.getTime()),W.info("SESSION","Created manual session",{memorySessionId:$,project:G}),$}close(){this.db.close()}importSdkSession(G){let $=T(G.platform_source),Z=this.db.prepare(`SELECT id FROM sdk_sessions
       WHERE platform_source = ? AND content_session_id = ?`).get($,G.content_session_id);if(Z)return{imported:!1,id:Z.id};return{imported:!0,id:this.db.prepare(`
      INSERT INTO sdk_sessions (
        content_session_id, memory_session_id, project, platform_source, user_prompt,
        started_at, started_at_epoch, completed_at, completed_at_epoch, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(G.content_session_id,G.memory_session_id,G.project,$,G.user_prompt,G.started_at,G.started_at_epoch,G.completed_at,G.completed_at_epoch,G.status).lastInsertRowid}}importSessionSummary(G){let $=this.db.prepare("SELECT id FROM session_summaries WHERE memory_session_id = ?").get(G.memory_session_id);if($)return{imported:!1,id:$.id};return{imported:!0,id:this.db.prepare(`
      INSERT INTO session_summaries (
        memory_session_id, project, request, investigated, learned,
        completed, next_steps, files_read, files_edited, notes,
        prompt_number, discovery_tokens, created_at, created_at_epoch
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(G.memory_session_id,G.project,G.request,G.investigated,G.learned,G.completed,G.next_steps,G.files_read,G.files_edited,G.notes,G.prompt_number,G.discovery_tokens||0,G.created_at,G.created_at_epoch).lastInsertRowid}}importObservation(G){let $=this.db.prepare(`
      SELECT id FROM observations
      WHERE memory_session_id = ? AND title = ? AND created_at_epoch = ?
    `).get(G.memory_session_id,G.title,G.created_at_epoch);if($)return{imported:!1,id:$.id};return{imported:!0,id:this.db.prepare(`
      INSERT INTO observations (
        memory_session_id, project, text, type, title, subtitle,
        facts, narrative, concepts, files_read, files_modified,
        prompt_number, discovery_tokens, agent_type, agent_id,
        created_at, created_at_epoch
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(G.memory_session_id,G.project,G.text,G.type,G.title,G.subtitle,G.facts,G.narrative,G.concepts,G.files_read,G.files_modified,G.prompt_number,G.discovery_tokens||0,G.agent_type??null,G.agent_id??null,G.created_at,G.created_at_epoch).lastInsertRowid}}rebuildObservationsFTSIndex(){if(!(this.db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='observations_fts'").all().length>0))return;this.db.run("INSERT INTO observations_fts(observations_fts) VALUES('rebuild')")}importUserPrompt(G){let $=null,Z=G.platform_source?T(G.platform_source):void 0;if(typeof G.session_db_id==="number"){let q=this.db.prepare(`
        SELECT id, content_session_id, COALESCE(NULLIF(platform_source, ''), '${U}') as platform_source
        FROM sdk_sessions
        WHERE id = ?
        LIMIT 1
      `).get(G.session_db_id);if(q&&q.content_session_id===G.content_session_id&&(!Z||T(q.platform_source)===Z))$=q.id}if($===null)$=this.resolvePromptSessionDbId(G.content_session_id,void 0,Z);let K=this.db.prepare(`
      SELECT id FROM user_prompts
      WHERE ${$!==null?"session_db_id = ?":"content_session_id = ?"} AND prompt_number = ?
    `).get($??G.content_session_id,G.prompt_number);if(K)return{imported:!1,id:K.id};return{imported:!0,id:this.db.prepare(`
      INSERT INTO user_prompts (
        session_db_id, content_session_id, prompt_number, prompt_text,
        created_at, created_at_epoch
      ) VALUES (?, ?, ?, ?, ?, ?)
    `).run($,G.content_session_id,G.prompt_number,G.prompt_text,G.created_at,G.created_at_epoch).lastInsertRowid}}}
