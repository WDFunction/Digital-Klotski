function chunk(arr: any[], num: number) {
    let result = []
    for (var index = 0; index < arr.length; index += num) {
        result.push(arr.slice(index, index + num))
    }
    return result
}

function createBoard() {
    const [, ...nums] = Array(8 * 8).keys()
    nums.push(0)
    return chunk(nums, 8)
}

// https://stackoverflow.com/a/56749849/8308032
const shuffle = (arr: any[]) =>
    [...arr].reduceRight((res, _, __, s) =>
        (res.push(s.splice(0 | Math.random() * s.length, 1)[0]), res), []);

type Point = {
    row: number;
    col: number
}

const validAxis = (p: number) => p <= 7 && p >= 0
const valid = (p: Point) => validAxis(p.row) && validAxis(p.col)
// row and column are starts with 0
export default class Game {
    board: number[][]
    white: Point
    constructor() {
        this.board = createBoard()
        this.white = {
            row: 7, col: 7
        }
        this.shuffle()
    }

    shuffle() {
        console.time('shuffle')
        for (let i = 1; i <= 4000; i++) {
            let arounds = shuffle(this.getAround(this.white))
            this.step(arounds[0])
        }
        console.timeEnd('shuffle')
        console.log(this.board)
    }

    getAround(pnt: Point): Point[] {
        let result: Point[] = []
        result.push({ row: pnt.row - 1, col: pnt.col })
        result.push({ row: pnt.row + 1, col: pnt.col })
        result.push({ row: pnt.row, col: pnt.col + 1 })
        result.push({ row: pnt.row, col: pnt.col - 1 })
        return result.filter(v => valid(v))
    }

    step(pnt: Point) {
        this.board[this.white.row][this.white.col] = this.board[pnt.row][pnt.col]
        this.board[pnt.row][pnt.col] = 0
        this.white = pnt
    }
}