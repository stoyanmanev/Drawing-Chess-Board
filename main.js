function drawChessboard(board) {
  const obj = {
    container: document.querySelector(`${board.field}`),

    field: [],
    pawn8: {
      A1: "fa-chess-rook",
      B1: "fa-chess-knight",
      C1: "fa-chess-bishop",
      D1: "fa-chess-queen",
      E1: "fa-chess-king",
      F1: "fa-chess-bishop",
      G1: "fa-chess-knight",
      H1: "fa-chess-rook",
      pawn: "fa-chess-pawn",
      A8: "fa-chess-rook",
      B8: "fa-chess-knight",
      C8: "fa-chess-bishop",
      D8: "fa-chess-queen",
      E8: "fa-chess-king",
      F8: "fa-chess-bishop",
      G8: "fa-chess-knight",
      H8: "fa-chess-rook",
    },
    pawn10: {
      A1: "fa-chess-rook",
      B1: "fa-chess-knight",
      C1: "fa-chess-knight",
      D1: "fa-chess-bishop",
      E1: "fa-chess-queen",
      F1: "fa-chess-king",
      G1: "fa-chess-bishop",
      H1: "fa-chess-knight",
      I1: "fa-chess-knight",
      J1: "fa-chess-rook",
      pawn: "fa-chess-pawn",
      A10: "fa-chess-rook",
      B10: "fa-chess-knight",
      C10: "fa-chess-knight",
      D10: "fa-chess-bishop",
      E10: "fa-chess-queen",
      F10: "fa-chess-king",
      G10: "fa-chess-bishop",
      H10: "fa-chess-knight",
      I10: "fa-chess-knight",
      J10: "fa-chess-rook",
    },
    proportions: {
      width: 0,
      heigth: 0,
    },
    size: board.size,

    getNumber: function (arr) {
      if (arr.length === 2) return Number(arr[1]);
      let str = "";
      for (let i = 1; i < arr.length; i++) {
        str += arr[i];
      }
      return Number(str);
    },

    generateFields: function (num) {
      const arr = [];
      const value = 10;
      for (let i = 1; i <= num; i++) {
        const obj = {};
        let j = 1;
        while (j <= num) {
          const letter = (value + j - 1).toString(36).toUpperCase();
          const str = letter + i;
          obj[str] = 0;
          j++;
        }
        arr.push(obj);
      }
      this.field = arr;
    },

    getPrevElementColorPredicate: function () {
      let row = this.container.lastElementChild;
      let i = row.children.length - 1;
      let col = row.children[i];
      let attrColor = col.children[0];
      attrColor = attrColor.getAttribute("data-color");

      attrColor === "true" ? (attrColor = false) : (attrColor = true);
      return attrColor;
    },

    isEven: function (arr) {
      const type = arr[0];
      const number = this.getNumber(arr);

      if (type === "A") {
        if (number % 2 === 0) {
          return true;
        }
        return false;
      }

      const color = obj.getPrevElementColorPredicate();
      return color;
    },

    getSizes: function () {
      this.proportions.width = this.container.offsetWidth / board.size;
      this.proportions.heigth = this.container.offsetHeight / board.size;
    },

    createPawn: function (position) {
      const icon = document.createElement("I");
      const num = this.field.length - 1;
      const item = "pawn" + this.field.length;

      if(this[item] === undefined) return icon; 

      if (
        (position.includes(num) && position.length === 2) ||
        (position.includes("2") && position.length === 2)
      ) {
        icon.setAttribute("class", `fas ${this[item].pawn}`);
      } else {
        icon.setAttribute("class", `fas ${this[item][position]}`);
      }

      return icon;
    },
    createItem: function (el) {
      const div = document.createElement("DIV");
      const col = document.createElement("DIV");
      const color = this.isEven(el.split(""));

      col.setAttribute("class", "col");
      div.setAttribute("data-filed", el);
      div.setAttribute("data-color", color);
      div.setAttribute(
        "style",
        `background-color: ${color ? board.color.odd : board.color.even};
        color: ${color ? board.color.even : board.color.odd}`
      );
      div.appendChild(this.createPawn(el));
      col.appendChild(div);
      return col;
    },

    render: function (f) {
      f.forEach((x) => {
        const div = document.createElement("DIV");
        div.setAttribute("class", "row");
        this.container.appendChild(div);
        Object.keys(x).map((y) => {
          div.appendChild(this.createItem(y));
        });
      });
    },
  };
  obj.generateFields(board.size);
  obj.getSizes();
  obj.render(obj.field);
}
drawChessboard(
  (chessboard = {
    size: 8,
    color: {
      odd: "#8a785d",
      even: "#fff",
    },
    field: "#root",
  })
);
