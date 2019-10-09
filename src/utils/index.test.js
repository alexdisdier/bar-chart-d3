import { drawSvgWrapper } from "./index";
// import { select, append, attr } from "d3";

jest.mock("d3", () => ({
  d3: {
    select: jest.fn(),
    append: () => {},
    attr: () => {}
  }
}));

describe("utils functions", () => {
  describe("create an svg", () => {
    // let params = {
    //   id: "container",
    //   width: 800,
    //   height: 400,
    //   padding: 60,
    //   margin: 100,
    //   d3: {
    //     select: jest.fn()
    //   }
    // };

    it("draws the svg", () => {
      // expect(drawSvgWrapper(params));
      // circleManager.draw(50);
      // expect(d3.select).toHaveBeenCalledWith('body');
      // expect(d3SpyObject.append).toHaveBeenCalledWith('svg');
      // expect(svgSpyObject.attr).toHaveBeenCalledWith('r', 50);
      // expect(svgSpyObject.attr).toHaveBeenCalledWith('width', 100);
      // expect(svgSpyObject.attr).toHaveBeenCalledWith('height', 100);
      // expect(svgSpyObject.style).toHaveBeenCalledWith('stroke', 'black');
    });
  });
});
