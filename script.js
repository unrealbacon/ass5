$(function () {
    const videos = [
        { element: $('#video1').get(0), section: $('#video-section-1') },
        { element: $('#video2').get(0), section: $('#video-section-2') }
    ];

    // 取得每個影片區段的邊界並調整為只滾動時才顯示
    function getSectionBoundaries() {
        return [
            { start: $('.leading').offset().top + $('.leading').height(), end: $('.middle').offset().top },
            { start: $('.middle').offset().top + $('.middle').height(), end: $('.ending').offset().top }
        ];
    }

    // 同步影片播放進度，新增縮放因子來控制播放速度
    function syncVideoWithScroll(videoElement, start, end, speedFactor) {
        const maxScrollDistance = end - start;
        const scrollDistance = $(document).scrollTop() - start;
        if (scrollDistance >= 0 && scrollDistance <= maxScrollDistance) {
            const scrollPercentage = scrollDistance / maxScrollDistance;
            // 使用speedFactor來調整影片播放進度
            videoElement.currentTime = videoElement.duration * scrollPercentage * speedFactor;
        }
    }

    // 每次滾動時觸發的事件
    $(window).scroll(function () {
        const scrollTop = $(document).scrollTop();
        const boundaries = getSectionBoundaries();

        // 播放速度調整比例，數值越小影片播放越慢
        const speedFactor = 1; // 改變這個值可以控制影片播放速度，0.5表示播放速度是正常的一半

        // 檢查影片 1 是否應當播放
        const firstVideo = videos[0];
        const firstBoundary = boundaries[0];
        if (scrollTop >= firstBoundary.start && scrollTop < firstBoundary.end) {
            // 當滾動進入影片區域時，啟用 sticky，並播放影片
            firstVideo.section.addClass('sticky');
            syncVideoWithScroll(firstVideo.element, firstBoundary.start, firstBoundary.end, speedFactor);
        } else {
            // 影片停止播放，並且取消 sticky 屬性
            firstVideo.element.pause();
            firstVideo.section.removeClass('sticky');
        }

        // 檢查影片 2 是否應當播放
        const secondVideo = videos[1];
        const secondBoundary = boundaries[1];
        if (scrollTop >= secondBoundary.start && scrollTop < secondBoundary.end) {
            // 當滾動進入影片區域時，啟用 sticky，並播放影片
            secondVideo.section.addClass('sticky');
            syncVideoWithScroll(secondVideo.element, secondBoundary.start, secondBoundary.end, speedFactor);
        } else {
            // 影片停止播放，並且取消 sticky 屬性
            secondVideo.element.pause();
            secondVideo.section.removeClass('sticky');
        }
    });
});
