package kr.ajousw.myspringweb.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.util.*;

@Getter
@Setter
@ToString
public class MusicList {

    private Integer resultCount;

    private List<Map<String, Object>> results;

}
