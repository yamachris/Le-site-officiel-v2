export const GAME_PORTAL_URL =
  process.env.REACT_APP_GAME_PORTAL_URL || 'http://localhost:4108';

interface GamePortalParams {
  playerNickname: string;
  unitUserId?: string;
  mode?: string;
  returnUrl?: string;
}

export const buildGamePortalUrl = ({
  playerNickname,
  unitUserId,
  mode,
  returnUrl,
}: GamePortalParams) => {
  const url = new URL(GAME_PORTAL_URL);
  url.searchParams.set('playerNickname', playerNickname);
  url.searchParams.set('source', 'official-site');

  if (unitUserId) {
    url.searchParams.set('unitUserId', unitUserId);
  }

  if (mode) {
    url.searchParams.set('mode', mode);
  }

  if (returnUrl) {
    url.searchParams.set('returnUrl', returnUrl);
  }

  return url.toString();
};
