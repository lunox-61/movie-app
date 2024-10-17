// src/services/favorites.ts
export const getFavorites = (): number[] => {
    const username = localStorage.getItem('username');
    
    if (username) {
      // Jika ada user login, simpan favorit berdasarkan username
      const favorites = localStorage.getItem(`favorites_${username}`);
      return favorites ? JSON.parse(favorites) : [];
    } else {
      // Jika guest, simpan favorit dalam kunci terpisah
      const guestFavorites = localStorage.getItem('guest_favorites');
      return guestFavorites ? JSON.parse(guestFavorites) : [];
    }
  };
  
  export const addFavorite = (movieId: number) => {
    const username = localStorage.getItem('username');
    
    if (username) {
      // Jika ada user login, simpan favorit berdasarkan username
      const favorites = getFavorites();
      favorites.push(movieId);
      localStorage.setItem(`favorites_${username}`, JSON.stringify(favorites));
    } else {
      // Jika guest, simpan dalam 'guest_favorites'
      const guestFavorites = getFavorites();
      guestFavorites.push(movieId);
      localStorage.setItem('guest_favorites', JSON.stringify(guestFavorites));
    }
  };
  
  export const removeFavorite = (movieId: number) => {
    const username = localStorage.getItem('username');
    
    if (username) {
      // Jika ada user login, hapus favorit berdasarkan username
      let favorites = getFavorites();
      favorites = favorites.filter(id => id !== movieId);
      localStorage.setItem(`favorites_${username}`, JSON.stringify(favorites));
    } else {
      // Jika guest, hapus dari 'guest_favorites'
      let guestFavorites = getFavorites();
      guestFavorites = guestFavorites.filter(id => id !== movieId);
      localStorage.setItem('guest_favorites', JSON.stringify(guestFavorites));
    }
  };
  