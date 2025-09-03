export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      polls: {
        Row: {
          id: string
          title: string
          description: string
          created_at: string
          created_by: string
          total_votes: number
        }
        Insert: {
          id?: string
          title: string
          description: string
          created_at?: string
          created_by: string
          total_votes?: number
        }
        Update: {
          id?: string
          title?: string
          description?: string
          created_at?: string
          created_by?: string
          total_votes?: number
        }
      }
      options: {
        Row: {
          id: string
          poll_id: string
          text: string
          votes: number
        }
        Insert: {
          id?: string
          poll_id: string
          text: string
          votes?: number
        }
        Update: {
          id?: string
          poll_id?: string
          text?: string
          votes?: number
        }
      }
      votes: {
        Row: {
          id: string
          poll_id: string
          option_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          poll_id: string
          option_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          poll_id?: string
          option_id?: string
          user_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']