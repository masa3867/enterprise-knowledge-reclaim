import type { KnowledgeDocument, QAEntry, SystemStats } from '@/types'

export const MOCK_SYSTEMS = ['受注管理システム', '生産管理システム', '会計システム', '在庫管理システム']

export const MOCK_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: 'doc-1', title: '受注管理システム 基本設計書 v3.2', category: 'design',
    system: '受注管理システム', pageCount: 48, status: 'indexed',
    uploadedAt: '2026-03-10T09:00:00Z', updatedAt: '2026-03-10T09:00:00Z',
    tags: ['基幹システム', '受注', 'ERD', 'API仕様'],
    excerpt: '本書は受注管理システムの基本設計を定義する。受注登録・承認・出荷指示・請求の一連のフローと、各モジュールのデータ構造、外部システムとのI/F仕様を記載する。',
  },
  {
    id: 'doc-2', title: '受注管理システム 運用マニュアル（情シス向け）', category: 'manual',
    system: '受注管理システム', pageCount: 32, status: 'indexed',
    uploadedAt: '2026-03-12T10:30:00Z', updatedAt: '2026-04-01T14:00:00Z',
    tags: ['運用', 'バッチ', 'エラー対応', '月次処理'],
    excerpt: '月次バッチ処理の実行手順、障害時の切り戻し手順、ベンダー連絡先一覧、過去の主要インシデント対応ログを収録。',
  },
  {
    id: 'doc-3', title: '生産管理システム 要件定義書（2019年リプレイス版）', category: 'design',
    system: '生産管理システム', pageCount: 72, status: 'indexed',
    uploadedAt: '2026-02-20T08:00:00Z', updatedAt: '2026-02-20T08:00:00Z',
    tags: ['要件定義', '工程管理', '原価計算', 'リプレイス'],
    excerpt: '2019年に実施した生産管理システムリプレイス時の要件定義書。旧システムからの移行方針、新機能一覧、業務フロー変更点を記載。現行システムとの差分を理解するための基準文書。',
  },
  {
    id: 'doc-4', title: 'ベンダーへの問い合わせ履歴（2023〜2024年）', category: 'ticket',
    system: '受注管理システム', pageCount: 15, status: 'indexed',
    uploadedAt: '2026-01-15T11:00:00Z', updatedAt: '2026-01-15T11:00:00Z',
    tags: ['問い合わせ', 'バグ', '仕様確認', 'ワークアラウンド'],
    excerpt: '2023年〜2024年の2年間にわたるベンダーへの問い合わせ記録。仕様確認・バグ報告・機能追加依頼の全66件を収録。回答内容と対応ステータスを含む。',
  },
  {
    id: 'doc-5', title: 'システム刷新検討委員会 議事録（全8回分）', category: 'minutes',
    system: '受注管理システム', pageCount: 24, status: 'indexed',
    uploadedAt: '2026-04-05T13:00:00Z', updatedAt: '2026-04-05T13:00:00Z',
    tags: ['議事録', 'システム刷新', '意思決定', '経営会議'],
    excerpt: '2025年度に行ったシステム刷新検討委員会の議事録全8回分。各回の検討事項、決定事項、宿題事項を記録。刷新見送りの判断根拠も含む。',
  },
  {
    id: 'doc-6', title: '会計システム 月次決算フロー手順書', category: 'manual',
    system: '会計システム', pageCount: 18, status: 'indexed',
    uploadedAt: '2026-02-01T09:00:00Z', updatedAt: '2026-03-15T10:00:00Z',
    tags: ['月次決算', '仕訳', 'データ連携', '会計'],
    excerpt: '月末の締め処理から月次決算レポート出力までの全手順。生産管理・受注管理との連携データ取り込みタイミング、チェックポイント一覧を含む。',
  },
  {
    id: 'doc-7', title: '在庫管理システム API仕様書 v1.5', category: 'design',
    system: '在庫管理システム', pageCount: 29, status: 'indexed',
    uploadedAt: '2026-03-20T15:00:00Z', updatedAt: '2026-03-20T15:00:00Z',
    tags: ['API', 'REST', '在庫', '外部連携'],
    excerpt: '在庫管理システムが公開するREST APIの全エンドポイント仕様。認証方式、リクエスト/レスポンス形式、エラーコード一覧、利用制限を記載。',
  },
  {
    id: 'doc-8', title: '情シス担当引き継ぎ資料（田中→鈴木）2024年4月', category: 'other',
    system: '受注管理システム', pageCount: 11, status: 'indexed',
    uploadedAt: '2026-01-08T10:00:00Z', updatedAt: '2026-01-08T10:00:00Z',
    tags: ['引き継ぎ', 'ノウハウ', 'システム概要', '連絡先'],
    excerpt: '前任担当者から現担当者への引き継ぎ資料。各システムの担当ベンダー連絡先、月次作業カレンダー、過去トラブルの注意事項、「絶対に触ってはいけない設定」リストを含む。',
  },
]

export const MOCK_QA: QAEntry[] = [
  {
    id: 'qa-1',
    question: '受注管理システムで月次バッチが失敗した場合、どのように切り戻しをすればよいですか？',
    answer: `月次バッチ失敗時の切り戻し手順は以下の通りです。

**1. 即時対応（失敗検知後30分以内）**
バッチ管理画面でステータスを確認し、失敗したジョブIDをメモしてください。データ更新が中途で止まっている場合は、まずロールバック処理を実行します。

**2. ロールバック実行手順**
管理コンソール > バッチ管理 > 失敗ジョブを選択 > 「ロールバック実行」ボタンをクリック。完了まで通常5〜10分かかります。

**3. 原因確認**
バッチログ（\`/var/log/batch/monthly_YYYYMMDD.log\`）を確認。タイムアウトの場合は接続先DBのリソース状況を確認します。

**4. 再実行判断**
当日中（23:59まで）であれば再実行可能です。翌日以降はベンダー（ABC情報システム：06-XXXX-XXXX）に連絡してください。

> ⚠️ 会計システムとのデータ連携が完了している場合は、単独ロールバック不可。必ずベンダーに相談してください。`,
    citations: [
      { docId: 'doc-2', docTitle: '受注管理システム 運用マニュアル（情シス向け）', excerpt: '月次バッチ失敗時の切り戻し手順…ロールバック実行後、バッチ管理画面でステータスを確認する', page: 14 },
      { docId: 'doc-4', docTitle: 'ベンダーへの問い合わせ履歴（2023〜2024年）', excerpt: '2023年12月：月次バッチタイムアウト事案。会計連携完了後のロールバック不可事例として記録', page: 7 },
    ],
    feedback: 'correct', askedAt: '2026-05-14T09:23:00Z', model: 'mock',
  },
  {
    id: 'qa-2',
    question: '生産管理システムと受注管理システムの間でデータ連携が遅延する原因として考えられることは何ですか？',
    answer: `データ連携遅延の主な原因として以下が考えられます。

**1. バッチ実行タイミングの競合**
生産管理→受注管理へのデータ連携バッチは毎時05分に実行されますが、月末締め処理と重なる場合に遅延が発生する事例が過去に複数確認されています。

**2. ネットワーク帯域の逼迫**
基幹システムは社内ネットワーク経由で連携しており、月末・月初の大量データ転送時に帯域が不足する場合があります。

**3. 受注管理システム側のロック待ち**
受注登録が集中する時間帯（10:00〜11:00、14:00〜15:00）にデータベースロックが発生し、連携バッチが待機状態になることがあります。

**確認手順**
まずバッチ管理ログを確認し、次にDBの待機状況（管理コンソール > DB監視）を確認してください。`,
    citations: [
      { docId: 'doc-3', docTitle: '生産管理システム 要件定義書（2019年リプレイス版）', excerpt: '生産管理→受注管理のデータ連携仕様：毎時05分バッチ実行、最大転送件数10,000件/回', page: 34 },
      { docId: 'doc-4', docTitle: 'ベンダーへの問い合わせ履歴（2023〜2024年）', excerpt: '2024年2月：月末締め処理とバッチ競合による60分遅延事案', page: 12 },
    ],
    feedback: 'partial', askedAt: '2026-05-13T14:05:00Z', model: 'mock',
  },
  {
    id: 'qa-3',
    question: '2019年のリプレイスで受注管理システムに追加された機能を教えてください',
    answer: `2019年のリプレイス時に追加された主な機能は以下の通りです。

**新規追加機能**
- 複数配送先への分割納品対応
- 電子承認ワークフロー（従来は紙運用）
- 受注データのCSV一括インポート機能
- 在庫管理システムとのリアルタイム連携（従来は日次バッチ）

**廃止された機能**
- FAX受注の自動取り込み（運用終了）
- 旧フォーマットのEDI連携（取引先移行済み）

なお、リプレイス要件定義書（生産管理システム版）には記載がありますが、受注管理の詳細な変更内容については設計書v3.2の変更履歴セクション（p.3）を参照してください。`,
    citations: [
      { docId: 'doc-3', docTitle: '生産管理システム 要件定義書（2019年リプレイス版）', excerpt: '旧システムからの移行方針、新機能一覧…複数配送先対応、電子承認ワークフローを新規実装', page: 8 },
      { docId: 'doc-1', docTitle: '受注管理システム 基本設計書 v3.2', excerpt: '改訂履歴：v3.0（2019年）リプレイス対応。v3.2（2023年）マイナー機能改修', page: 3 },
    ],
    feedback: null, askedAt: '2026-05-12T10:30:00Z', model: 'mock',
  },
  {
    id: 'qa-4',
    question: '情シス担当の引き継ぎ資料によると、絶対に触ってはいけない設定は何ですか？',
    answer: `引き継ぎ資料（田中→鈴木、2024年4月）に記載された注意事項です。

**絶対に変更してはいけない設定**
1. **受注管理DB接続設定** — 本番環境のDB接続文字列は設定ファイルを直接編集しないこと。変更はベンダー（ABC情報システム）経由のみ
2. **バッチスケジューラの実行順序** — ジョブの実行順序は厳密に依存関係があり、順序変更は連鎖的なデータ不整合を引き起こす
3. **会計システム連携の締め日設定** — 月次処理開始後の変更は不可。翌月まで待つこと

**要注意の定期作業**
- 毎月最終営業日のバッチ監視は必ず担当者が直接実施（自動監視では拾えない例外パターンあり）
- 年に1回のSSL証明書更新は2ヶ月前からベンダーに連絡開始

> 💡 この資料自体が「知識の属人化」の典型例です。本システムはこれをナレッジベースとして構造化します。`,
    citations: [
      { docId: 'doc-8', docTitle: '情シス担当引き継ぎ資料（田中→鈴木）2024年4月', excerpt: '絶対に触ってはいけない設定：DB接続文字列、バッチ実行順序、会計システム連携設定', page: 6 },
    ],
    feedback: 'correct', askedAt: '2026-05-10T16:00:00Z', model: 'mock',
  },
]

export const MOCK_STATS: SystemStats = {
  documentCount: MOCK_DOCUMENTS.length,
  systemCount: MOCK_SYSTEMS.length,
  qaCount: 47,
  feedbackCount: 31,
  lastIndexed: '2026-05-15T06:00:00Z',
}

// mutable stores
const docStore: KnowledgeDocument[] = [...MOCK_DOCUMENTS]
const qaStore: QAEntry[] = [...MOCK_QA]

export function getDocs(): KnowledgeDocument[] {
  return [...docStore].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt))
}
export function getDoc(id: string) { return docStore.find(d => d.id === id) ?? null }

export function getQAs(): QAEntry[] {
  return [...qaStore].sort((a, b) => b.askedAt.localeCompare(a.askedAt))
}
export function getQA(id: string) { return qaStore.find(q => q.id === id) ?? null }

export function addQA(entry: QAEntry) { qaStore.unshift(entry) }

export function setFeedback(id: string, feedback: QAEntry['feedback']) {
  const q = qaStore.find(q => q.id === id)
  if (q) q.feedback = feedback
}

export const IS_MOCK_MODE = !process.env.ANTHROPIC_API_KEY || process.env.NEXT_PUBLIC_MOCK_MODE === 'true'

export const MOCK_ANSWER = {
  answer: `これはモックモードの回答例です。\n\n実際の環境では、アップロードされたドキュメントからRAGで関連情報を検索し、Claude APIを使って回答を生成します。\n\n**モックモードでできること**\n- ドキュメント一覧の確認\n- 過去のQ&A履歴の閲覧\n- フィードバック機能のUI確認\n\n環境変数 \`ANTHROPIC_API_KEY\` を設定すると実際のAI回答が有効になります。`,
  citations: [
    { docId: 'doc-1', docTitle: '受注管理システム 基本設計書 v3.2', excerpt: 'モックモードのサンプル引用元です。', page: 1 },
  ] as import('@/types').Citation[],
}
