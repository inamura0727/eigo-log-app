//MockData

export type Category = 'grammar' | 'vocabulary' | 'expression';
export type Target = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export const profiles = [
	{
		id: '10000000-0000-4000-8000-000000000003',
		username: 'John',
		created_at: '2026-06-22T09:00:00Z',
		update_at: '2026-06-22T09:00:00Z',
		image: '/images/john.png',
	},
];

export const writingEntries = [
	{
		id: '20000000-0000-4000-8000-000000000001',
		user_id: profiles[0].id,
		title: 'My Weekend',
		original_text: 'I goed to London last weekend.',
		status: true,
		target: 'B1' as Target,
		created_at: '2026-06-20T10:00:00Z',
		updated_at: '2026-06-20T10:30:00Z',
	},
	{
		id: '20000000-0000-4000-8000-000000000002',
		user_id: profiles[0].id,
		title: 'Meeting Report',
		original_text: 'We discussed about the new project.',
		status: true,
		target: 'A1' as Target,
		created_at: '2026-06-21T10:00:00Z',
		updated_at: '2026-06-21T10:30:00Z',
	},
	{
		id: '20000000-0000-4000-8000-000000000003',
		user_id: profiles[0].id,
		title: 'Climate Change',
		original_text: 'Climate change ダミーデータ.',
		status: false,
		target: 'A2' as Target,
		created_at: '2026-06-22T10:00:00Z',
		updated_at: '2026-06-22T10:30:00Z',
	},
];

export const correctionRuns = [
	{
		id: '30000000-0000-4000-8000-000000000001',
		entry_id: writingEntries[0].id,
		source_text: writingEntries[0].original_text,
		corrected_text: 'I went to London last weekend.',
		created_at: '2026-06-20T10:10:00Z',
	},
	{
		id: '30000000-0000-4000-8000-000000000002',
		entry_id: writingEntries[1].id,
		source_text: writingEntries[1].original_text,
		corrected_text: 'We discussed the new project.',
		created_at: '2026-06-21T10:10:00Z',
	},
	{
		id: '30000000-0000-4000-8000-000000000003',
		entry_id: writingEntries[2].id,
		source_text: writingEntries[2].original_text,
		corrected_text: 'Climate change affects many countries.',
		created_at: '2026-06-22T10:10:00Z',
	},
];

export const correctionItems = [
	{
		id: '40000000-0000-4000-8000-000000000001',
		correction_run_id: correctionRuns[0].id,
		category: 'grammar' as Category,
		original: 'goed',
		corrected: 'went',
		explanation: '"Go"の過去形は"went"です。',
		display_order: 1,
		created_at: '2026-06-20T10:11:00Z',
	},
	{
		id: '40000000-0000-4000-8000-000000000002',
		correction_run_id: correctionRuns[0].id,
		category: 'vocabulary' as Category,
		original: 'ダミーデータ',
		corrected: 'ダミーデータ',
		explanation: 'ダミーデータ',
		display_order: 1,
		created_at: '2026-06-21T10:11:00Z',
	},
	{
		id: '40000000-0000-4000-8000-000000000003',
		correction_run_id: correctionRuns[0].id,
		category: 'expression' as Category,
		original: 'ダミーデータ',
		corrected: 'ダミーデータ',
		explanation: 'ダミーデータ',
		display_order: 1,
		created_at: '2026-06-22T10:11:00Z',
	},
	{
		id: '40000000-0000-4000-8000-000000000004',
		correction_run_id: correctionRuns[1].id,
		category: 'grammar' as Category,
		original: 'about',
		corrected: '',
		explanation: '"Discuss"は他動詞なので、後ろの"about"は不要です。',
		display_order: 2,
		created_at: '2026-06-21T10:12:00Z',
	},
	{
		id: '40000000-0000-4000-8000-000000000005',
		correction_run_id: correctionRuns[1].id,
		category: 'vocabulary' as Category,
		original: 'new project',
		corrected: 'proposed project',
		explanation:
			'"Proposed project"にすると、提案されたプロジェクトであることが明確になります。',
		display_order: 3,
		created_at: '2026-06-21T10:13:00Z',
	},
	{
		id: '40000000-0000-4000-8000-000000000006',
		correction_run_id: correctionRuns[1].id,
		category: 'expression' as Category,
		original: 'discussed',
		corrected: 'reviewed',
		explanation: '"Reviewed"を使うと、内容を詳しく検討したニュアンスになります。',
		display_order: 4,
		created_at: '2026-06-21T10:14:00Z',
	},
	{
		id: '40000000-0000-4000-8000-000000000007',
		correction_run_id: correctionRuns[2].id,
		category: 'grammar' as Category,
		original: 'affect',
		corrected: 'affects',
		explanation: '主語の"Climate change"は単数なので、動詞に"s"が必要です。',
		display_order: 2,
		created_at: '2026-06-22T10:12:00Z',
	},
	{
		id: '40000000-0000-4000-8000-000000000008',
		correction_run_id: correctionRuns[2].id,
		category: 'expression' as Category,
		original: 'country',
		corrected: 'countries',
		explanation: '"Many"の後ろには複数形の名詞を使用します。',
		display_order: 3,
		created_at: '2026-06-22T10:13:00Z',
	},
	{
		id: '40000000-0000-4000-8000-000000000009',
		correction_run_id: correctionRuns[2].id,
		category: 'vocabulary' as Category,
		original: 'many countries',
		corrected: 'countries around the world',
		explanation: 'より自然で具体的な表現になります。',
		display_order: 4,
		created_at: '2026-06-22T10:14:00Z',
	},
];

export const questions = [
	{
		id: '50000000-0000-4000-8000-000000000001',
		correction_run_id: correctionRuns[0].id,
		question_text: 'What did you enjoy most in London?',
		created_at: '2026-06-20T10:12:00Z',
	},
	{
		id: '50000000-0000-4000-8000-000000000002',
		correction_run_id: correctionRuns[0].id,
		question_text: 'What was decided during the meeting?',
		created_at: '2026-06-21T10:12:00Z',
	},
	{
		id: '50000000-0000-4000-8000-000000000003',
		correction_run_id: correctionRuns[0].id,
		question_text: 'How can countries address climate change?',
		created_at: '2026-06-22T10:12:00Z',
	},
	{
		id: '50000000-0000-4000-8000-000000000004',
		correction_run_id: correctionRuns[1].id,
		question_text: 'How can countries address climate change?',
		created_at: '2026-06-22T10:12:00Z',
	},
	{
		id: '50000000-0000-4000-8000-000000000005',
		correction_run_id: correctionRuns[1].id,
		question_text: 'How can countries address climate change?',
		created_at: '2026-06-22T10:12:00Z',
	},
	{
		id: '50000000-0000-4000-8000-000000000006',
		correction_run_id: correctionRuns[1].id,
		question_text: 'How can countries address climate change?',
		created_at: '2026-06-22T10:12:00Z',
	},
	{
		id: '50000000-0000-4000-8000-000000000007',
		correction_run_id: correctionRuns[2].id,
		question_text: 'How can countries address climate change?',
		created_at: '2026-06-22T10:12:00Z',
	},
	{
		id: '50000000-0000-4000-8000-000000000008',
		correction_run_id: correctionRuns[2].id,
		question_text: 'How can countries address climate change?',
		created_at: '2026-06-22T10:12:00Z',
	},
	{
		id: '50000000-0000-4000-8000-000000000009',
		correction_run_id: correctionRuns[2].id,
		question_text: 'How can countries address climate change?',
		created_at: '2026-06-22T10:12:00Z',
	},
];

export const tags = [
	{ id: '60000000-0000-4000-8000-000000000001', name: 'Travel' },
	{ id: '60000000-0000-4000-8000-000000000002', name: 'Work' },
	{ id: '60000000-0000-4000-8000-000000000003', name: 'Environment' },
];

export const entryTags = [
	{ entry_id: writingEntries[0].id, tag_id: tags[0].id },
	{ entry_id: writingEntries[1].id, tag_id: tags[1].id },
	{ entry_id: writingEntries[2].id, tag_id: tags[2].id },
];
