import Image from '../models/Image';

export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `http://10.0.0.104:3333/uploads/${image.name}`,
        }
    },

    renderMany(images: Image[]) {
        return images.map(image => this.render(image));
    }
}