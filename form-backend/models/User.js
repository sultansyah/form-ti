import mongoose from "mongoose"

const Schema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    noInduk: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    jurusan: {
        type: String,
        required: true,
    },
    prodi: {
        type: String,
        required: true,
    },
    kotaLahir: {
        type: String,
        required: true,
    },
    tanggalLahir: {
        type: Date,
        required: true,
    },
    level: {
        type: String,
        enum: ['admin', 'mahasiswa', 'dosen'],
        default: 'mahasiswa',
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
        required: true
    },
    createAt: {
        type: Number
    },
    updateAt: {
        type: Number
    }
},
{
    timestamps: {
        currentTime: () => Math.floor(Date.now() / 1000)
    }
}
)

export default mongoose.model('User', Schema)