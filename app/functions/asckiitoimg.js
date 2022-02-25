import * as Jimp from 'jimp';

export async function ascii_img(scale, filename, canvas, outfilename, moreLevels, fontsize, fontcolor) {


    let gscale1 = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";

    let gscale2 = "@%#*+=-:. ";

    let fo;

    console.log('hi in func');

    switch (fontcolor) {
        case 'white':
            switch (fontsize) {
                case 8:
                    fo = Jimp.FONT_SANS_8_WHITE;

                    break;

                case 16:
                    fo = Jimp.FONT_SANS_16_WHITE;

                    break;

                case 32:
                    fo = Jimp.FONT_SANS_32_WHITE;

                    break;

                case 64:
                    fo = Jimp.FONT_SANS_64_WHITE;

                    break;
            }

            break;
        case 'black':
            switch (fontsize) {
                case 8:
                    fo = Jimp.FONT_SANS_8_BLACK;

                    break;

                case 16:
                    fo = Jimp.FONT_SANS_16_BLACK;

                    break;

                case 32:
                    fo = Jimp.FONT_SANS_32_BLACK;

                    break;

                case 64:
                    fo = Jimp.FONT_SANS_64_BLACK;

                    break;
            }

            break;
        default:
            fo = Jimp.FONT_SANS_8_BLACK;

    }


    //Load image to memory 
    console.log('0 read')

    Jimp.default.read(filename, (err, mona) => {
        console.log('1 read')


        const image = mona.greyscale();

        let W = image.bitmap.width; //  width of the image

        let H = image.bitmap.height; // height of the image


        console.log((`input image dims: %d x %d" % ${[W, H]}`));

        let cols = Number.parseInt(W * scale);

        var w = Number.parseInt(W / cols);

        let rows = Number.parseInt(H * scale);

        var h = Number.parseInt(H / rows);

        console.log((`cols: %d, rows: %d" % ${[cols, rows]}`));

        console.log((`tile dims: %d x %d" % ${[w, h]}`));

        if (((cols > W) || (rows > H))) {
            console.log("Image too small for specified cols!");
            exit(0);
        }

        let aimg = [];

        for (let j = 0, _pj_a = rows; (j < _pj_a); j += 1) {
            let y1 = Number.parseInt((j * h));
            let y2 = Number.parseInt(((j + 1) * h));

            if ((j === (rows - 1))) {
                y2 = H;
            }

            aimg.push([]);

            for (let i = 0, _pj_b = cols; (i < _pj_b); i += 1) {
                let x1 = Number.parseInt((i * w));
                let x2 = Number.parseInt(((i + 1) * w));
                if ((i === (cols - 1))) {
                    x2 = W;
                }


                let avg = 0;
                let sum = 0;

                for (let k = x1; k < x2; k++) {
                    for (let l = y1; l < y2; l++) {
                        sum = sum + Jimp.default.intToRGBA(image.getPixelColor(k, l)).r;
                    }

                }
                avg = sum / (w * h) + 1;

                if (moreLevels) {
                    let gsval = gscale1[Number.parseInt(((avg * 69) / 255))];
                    if (Number.parseInt(((avg * 9) / 255)) > 69) {
                        let gsval = ' ';
                        aimg[j].push(gsval);
                    }
                    aimg[j].push(gsval);
                } else {
                    let gsval = gscale2[Number.parseInt(((avg * 9) / 255))];
                    if (Number.parseInt(((avg * 9) / 255)) > 9) {
                        let gsval = ' ';
                        aimg[j].push(gsval);
                    }
                    aimg[j].push(gsval);
                }

            }
        }

        new Jimp.default(Number.parseInt(cols * 7), Number.parseInt(rows * 7), canvas, (err, image) => {
            if (image) {
                console.log('here im 3')

                Jimp.default.loadFont(Jimp.default.FONT_SANS_8_BLACK)
                    .then(font => {
                        console.log('font on')

                        let index_row = - 2;

                        aimg.forEach(row => {

                            let index_col = 0;

                            row.forEach(char => {


                                image = image.print(font, index_col, index_row, char);

                                index_col += 7;

                            });

                            index_row += 7;
                        });

                        return image
                    }).then(image => {
                        console.log('here im 4 ')

                        return image.write(`./asckiiART/${outfilename}`) // save
                    })

            }

            if (err) throw err;
        });

    })


}