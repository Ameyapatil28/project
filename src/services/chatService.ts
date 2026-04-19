import supabase from '../supabaseClient';

export interface ChatMessageData {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const fetchChatHistory = async (): Promise<ChatMessageData[]> => {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .order('created_at', { ascending: true }); // Keep historical order

  if (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }

  return data.map((item: any) => ({
    id: item.id,
    text: item.text,
    sender: item.sender,
    timestamp: new Date(item.created_at),
  }));
};

export const saveChatMessage = async (text: string, sender: 'user' | 'ai'): Promise<ChatMessageData | null> => {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return null;

  const { data, error } = await supabase
    .from('chat_messages')
    .insert([
      {
        user_id: userData.user.id,
        text,
        sender,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error saving chat message:', error);
    return null;
  }

  return {
    id: data.id,
    text: data.text,
    sender: data.sender,
    timestamp: new Date(data.created_at),
  };
};
