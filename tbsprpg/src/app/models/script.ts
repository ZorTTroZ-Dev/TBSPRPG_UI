export interface Script {
  id: string;
  name: string;
  adventureId: string;
  type: string;
  content: string;
  includes: Script[];
}

export const LUA_SCRIPT_TYPE = 'lua';

export const SCRIPT_TYPES: string[] = [LUA_SCRIPT_TYPE];
