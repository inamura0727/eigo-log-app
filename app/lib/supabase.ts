import { createClient } from '@supabase/supabase-js';

//Loading environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

//Creating a Supabase Client using supabaseUrl and supabaseAnonKey
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definition
export type Profile = {
	id: string;
	username: string;
	created_at?: string;
	update_at?: string;
	image?: string;
};

export type WritingEntries = {
	id: string;
	user_id: string;
	title: string;
	original_text: string;
	status: string;
	target_level: string;
	created_at?: string;
	updated_at?: string;
};

export type CorrectionRun = {
	id: string;
	entry_id: string;
	source_text: string;
	corrected_text: string;
	created_at: string;
};

export type CorrectionItemType = {
	id: string;
	correction_run_id: string;
	category: string;
	original: string;
	corrected: string;
	explanation: string;
	display_order: number;
};

export type Question = {
	id: string;
	correction_run_id: string;
	question_text: string;
	created_at?: string;
};

export type Tag = {
	id: string;
	name: string;
};

export type CorrectionDetail = {
	original: string;
	corrected: string;
	explanation: string;
};

export type CorrectionResult = {
	originalText: string;
	correctedEnglish: string;
	betterVocabulary: CorrectionDetail[];
	usefulExpressions: CorrectionDetail[];
	grammar: CorrectionDetail[];
	questions: string[];
};
