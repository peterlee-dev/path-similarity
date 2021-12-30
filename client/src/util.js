export const getSVGPoint = (x, y, svgEl) => {
    const pt = svgEl.createSVGPoint();
    pt.x = x;
    pt.y = y;
    const pos = pt.matrixTransform(svgEl.getScreenCTM().inverse());
    return {
        // 소수점 3자리까지 수집되도록 수정 2018.12.18 Daniel
        x: Math.round(pos.x * 1e3) / 1e3,
        y: Math.round(pos.y * 1e3) / 1e3
    };
};
export const getPointAtEvent = (e, svgEl) => {
    const { x, y } = e?.changedTouches?.[0] ?? e;

    return getSVGPoint(x, y, svgEl);
};
