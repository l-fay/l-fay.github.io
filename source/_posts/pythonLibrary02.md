---
title: mutagen | MP3封面操作
date: 2021-01-06 21:47:25
tags: [Python]
categories: 
  - [Python, 常用库, mutagen]
---
先放一个函数。

<!-- more -->

## MP3添加封面

```
def set_song_metadata(ID, singer, song_name, album, pic):
    mp3_dir = os.path.join(get_my_music_dir(), singer + " - " + song_name + ".mp3")
    audio = ID3(mp3_dir)
    img = open(pic, 'rb')
    print(audio)
    audio.update_to_v23()  # 把可能存在的旧版本升级为2.3
    audio['APIC'] = APIC(  # 插入专辑图片
        encoding=0,
        mime='image/jpeg',
        type=3,
        # desc=u'Cover',
        data=img.read()
    )
    audio['TIT2'] = TIT2(  # 插入歌名
        encoding=3,
        text=song_name
    )
    audio['TPE1'] = TPE1(  # 插入第一演奏家、歌手、等
        encoding=3,
        text=singer
    )
    audio['TALB'] = TALB(  # 插入专辑名称
        encoding=3,
        text=album
    )
    audio.save()  # 记得要保存
    img.close()
```

### 注意点

这个是网上找的代码，找了几个都一样，主要改了两个地方。

第一个是`img = open(pic, 'rb')`，将打开方式从r改成了rb，避免`data=img.read()`报错。

第二个是
```
    audio['APIC'] = APIC(  # 插入专辑图片
        encoding=0,
        mime='image/jpeg',
        type=3,
        # desc=u'Cover',
        data=img.read()
    )
```
中，将`encoding=3`改为了`encoding=0`，3是Encoding.UTF8，0是Encoding.LATIN1。

两者都能在Mp3tag上读取出来，但是只有Encoding.LATIN1能在电脑中有预览图，手机里没有测试。

## MP3清除封面

```
def del_all_cover(mp3_dir):
    audio = ID3(mp3_dir)
    del_list=[]
    for i in audio2:
        a = re.search(r"APIC", i)
        if a:
            del_list.append(i)
    for i in del_list:
        del(audio[i])
    audio.save()
```

audio虽然很像字典，但它毕竟不是字典，它是ID3对象，没有copy()方法，所以只能用这种方法来删除。

先这样。