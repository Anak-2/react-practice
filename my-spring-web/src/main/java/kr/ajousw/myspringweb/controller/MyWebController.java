package kr.ajousw.myspringweb.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import kr.ajousw.myspringweb.dto.FavoriteMusicRequestDto;
import kr.ajousw.myspringweb.dto.MusicList;
import kr.ajousw.myspringweb.entity.FavoriteMusic;
import kr.ajousw.myspringweb.service.MusicService;

@RestController
public class MyWebController {

    @Autowired
    MusicService service;

    RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/musicSearch/{term}")
    public MusicList musicSearchByPath(@PathVariable String term) {
        System.out.println("Call musicSearchByPath");
        return service.searchMusic(term);
    }

    @GetMapping("/musicSearch")
    public MusicList musicSearchByParam(@RequestParam String term) {
        return service.searchMusic(term);
    }

    @GetMapping("/likes")
    public List<FavoriteMusic> getLikes() {
        return service.getLikes();
    }

    @PostMapping("likes")
    public int postLikes(@RequestBody FavoriteMusicRequestDto favorite) {
        return service.saveFavorite(favorite);
    }

    @DeleteMapping("likes/{id}")
    public void deleteLikes(@PathVariable String id) {
        service.delteFavorite(id);
    }
}
