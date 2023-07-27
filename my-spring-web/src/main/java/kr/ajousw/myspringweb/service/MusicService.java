package kr.ajousw.myspringweb.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;
import kr.ajousw.myspringweb.dto.FavoriteMusicRequestDto;
import kr.ajousw.myspringweb.dto.MusicList;
import kr.ajousw.myspringweb.entity.FavoriteMusic;
import kr.ajousw.myspringweb.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MusicService {

    private final FavoriteRepository albumsRepo;
    RestTemplate restTemplate = new RestTemplate();

    public MusicList searchMusic(String term) {
        try {
            String response = restTemplate
                    .getForObject("https://itunes.apple.com/search?term=" + term + "&entity=album", String.class);
            ObjectMapper mapper = new ObjectMapper();
            MusicList list = mapper.readValue(response, MusicList.class);
            System.out.println(list.getResultCount());
            return list;
        } catch (IOException e) {
            System.out.println(e.toString());
            throw new RuntimeException(e);
        }
    }

    public List<FavoriteMusic> getLikes() {
        try {
            return albumsRepo.findAll();
        } catch (Exception e) {
            System.out.println(e.toString());
            throw new RuntimeException(e);
        }
    }

    public int saveFavorite(FavoriteMusicRequestDto favorite) {
        FavoriteMusic favoriteMusic = albumsRepo.save(favorite.toEntity());
        if (favoriteMusic != null) {
            return 1;
        } else {
            return 0;
        }
    }

    public void delteFavorite(String id) {
        try {
            albumsRepo.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
