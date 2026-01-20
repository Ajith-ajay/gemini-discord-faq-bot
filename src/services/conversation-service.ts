interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export class ConversationService {
  private conversations = new Map<string, Message[]>();

  public addMessage(userId: string, role: 'user' | 'model', text: string) {
    if (!this.conversations.has(userId)) {
      this.conversations.set(userId, []);
    }

    const userHistory = this.conversations.get(userId)!;
    userHistory.push({ role, parts: [{ text }] });
  }

  public getHistory(userId: string): Message[] {
    return this.conversations.get(userId) || [];
  }

  public clearHistory(userId: string) {
    this.conversations.delete(userId);
  }
}
