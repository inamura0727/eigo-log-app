import { PostgrestError } from '@supabase/supabase-js';
import { CefrLevel } from '../components/targetButton';

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
	user_id: string;
};

type Category = 'grammar' | 'expression' | 'vocabulary';

export type CorrectionItemType = {
	id: string;
	correction_run_id: string;
	category: Category;
	original: string;
	corrected: string;
	explanation: string;
	display_order: number;
};

export type Question = {
	id?: string;
	correction_run_id?: string;
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
	entry_id: string;
	originalText: string;
	correctedEnglish: string;
	betterVocabulary: CorrectionDetail[];
	usefulExpressions: CorrectionDetail[];
	grammar: CorrectionDetail[];
	questions: string[];
	target: boolean;
};

export type draftItem = {
	id: string;
	original_text: string;
	target: CefrLevel;
	created_at: string;
};

export type GetDraftResponse = {
	data: draftItem[] | null;
	error: PostgrestError | null;
};

export type GetHistoryResponse = {
	data: CorrectionRun[] | null;
	error: PostgrestError | null;
};

export type saveWritingEntryResponse = {
	entry_id: string;
};

export type ReviewResultProps = {
	original_text: string;
	corrected_text: string;
	betterVocabulary: CorrectionDetail[];
	usefulExpressions: CorrectionDetail[];
	grammar: CorrectionDetail[];
	questions: Question[];
	handleSaveReview?: () => Promise<void>;
};
