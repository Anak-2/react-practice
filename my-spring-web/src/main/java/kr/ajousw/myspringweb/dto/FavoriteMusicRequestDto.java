package kr.ajousw.myspringweb.dto;

import jakarta.persistence.Column;
import kr.ajousw.myspringweb.entity.FavoriteMusic;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FavoriteMusicRequestDto {

    private String collectionId;

    private String collectionType;

    private String artistId;

    private String artistName;

    private String artistViewUrl;

    private String collectionName;

    private String collectionViewUrl;

    public FavoriteMusic toEntity() {
        FavoriteMusic favoriteMusic = new FavoriteMusic();
        favoriteMusic.setCollectionId(collectionId);
        favoriteMusic.setCollectionType(collectionType);
        favoriteMusic.setArtistId(artistId);
        favoriteMusic.setArtistName(artistName);
        favoriteMusic.setArtistViewUrl(artistViewUrl);
        favoriteMusic.setCollectionName(collectionName);
        favoriteMusic.setCollectionViewUrl(collectionViewUrl);
        return favoriteMusic;
    }
}