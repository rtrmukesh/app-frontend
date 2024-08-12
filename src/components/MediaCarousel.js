// Import necessary components and icons
import { FontAwesome5 } from '@expo/vector-icons';
import { Video } from "expo-av";
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import DeleteModal from "../components/Modal/DeleteConfirmationModal";
import { Color } from '../helper/Color';
import style from "../helper/Styles";
import Media from "../lib/Media";
import mediaService from "../services/MediaService";
import Label from "./Label";
import Spinner from './Spinner';



const { width, height } = Dimensions.get('window');

const ImageSwiper = (props) => {

    let { imageTitle, images, setImages, handleAdd, getMediaList, showAddButton, showDeleteButton, videoTitle } = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mediaDeleteModal, setMediaDeleModal] = useState(false)
    const [rowData, setRowData] = useState(null);
    const [isLoading, setIsLoading] = useState(props?.isLoading ? props?.isLoading : false);
    const [modalVisible, setModalVisible] = useState(false);


    const mediaDeleteToggle = () => {
        setMediaDeleModal(!mediaDeleteModal);
    }
    const videoRef = useRef(null);

    const handleDelete = (index, imageData) => {
        setRowData(imageData)
        const newImages = [...images];
        newImages.splice(currentIndex, 1);
        setImages && setImages(newImages);
        mediaDeleteToggle()
    };

    const removeImage = (id) => {
        if (id) {
            setIsLoading(true)
            mediaService.deleteMedia(id, (error, response) => {
                getMediaList && getMediaList();
                setIsLoading(false)
            });
        }
    }

    const handleImagePress = (index) => {
        setCurrentIndex(index);
        setModalVisible(true);
    };

    if (props?.isLoading == true ? props?.isLoading : isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <DeleteModal
                modalVisible={mediaDeleteModal}
                toggle={mediaDeleteToggle}
                updateAction={() => removeImage(rowData?.id)}
                id={rowData?.id}
            />
            <View style={styles.container}>
                <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row" }}>
                        {imageTitle && <Label text={imageTitle} bold={true} />}
                        {videoTitle && <Label text={videoTitle} bold={true} marginLeft={4} />}
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        {showAddButton && <TouchableOpacity
                            style={{ marginRight: 5 }}
                            onPress={() => handleAdd && handleAdd(true)}
                        >
                            <Text style={{ color: "blue" }}> Add Photo</Text>
                        </TouchableOpacity>}
                        {showAddButton &&  videoTitle && <TouchableOpacity
                            style={{ marginRight: 5 }}
                            onPress={() => handleAdd && handleAdd(false)}
                        >
                            <Text style={{ color: "blue" }}> Add Video</Text>
                        </TouchableOpacity>}
                    </View>
                </View>
                {images && images.length > 0 ? (
                    <>
                        <Swiper
                            style={styles.wrapper}
                            showsPagination={false}
                            index={0}
                            bounces={true}
                            loop={false}
                        >
                            {images.map((image, index) => (
                                <View key={index} style={styles.slide}>
                                    <TouchableOpacity
                                        onPress={() => handleImagePress(index)}
                                    >
                                        <Image
                                            source={{ uri: image?.uri ? image?.uri : image?.url }}
                                            style={styles.image}
                                            resizeMode='cover'

                                        />
                                    </TouchableOpacity>
                                    {showDeleteButton && <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => handleDelete(index, image)}
                                    >
                                        <FontAwesome5 name='trash' size={24} color='black' />
                                    </TouchableOpacity>}
                                </View>
                            ))}
                        </Swiper>
                        <Modal
                            visible={modalVisible}
                            transparent={true}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={styles.modalContainer}>
                                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                    <FontAwesome5 name='times-circle' size={50} color='white' />
                                </TouchableOpacity>
                                <Swiper
                                    style={styles.modelWrapper}
                                    index={currentIndex}
                                    loop={false}
                                    showsPagination={false}
                                >
                                    {images.map((image, index) => (
                                        <View key={index} style={styles.slide}>
                                            {Media.isImage(image?.name) &&
                                              <Image
                                                source={{ uri: image?.uri ? image?.uri : image.url }}
                                                style={styles.modelImage}
                                                resizeMode='contain'
                                            />
                                            }

                                            {Media.isVideo(image?.name) &&
                                            <Video
                                            ref={videoRef}
                                            source={{ uri: image?.uri ? image?.uri : image.url }}
                                            style={style.imageSize} 
                                            resizeMode="contain"
                                            shouldPlay={true}
                                            isMuted={false}
                                          />
                                            }
                                        </View>
                                    ))}
                                </Swiper>
                            </View>
                        </Modal>
                    </>
                ) : (
                    <View style={{ paddingVertical: 250, alignItems: 'center' }}>
                        <FontAwesome5 name='receipt' size={20} color={Color.PRIMARY} />
                        <Text style={{ fontWeight: 'bold' }}>No Media Uploaded</Text>
                    </View>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    video: {
        width: 300,
        height: 200,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    imageTitle: {
        position: 'absolute',
        top: 20,
        fontSize: 20,
        color: Color.PRIMARY,
    },
    wrapper: {
        height: height - 350,
    },
    modelWrapper: {
        height: height,
    },
    closeButton: {
        top: 20,
        right: 20,
        left: 150
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
    },
    slide: {
        flex: 1,
        marginTop: 5,
        alignItems: 'center',
    },
    image: {
        width: width,
        height: 300,
    },
    modelImage: {
        width: width,
        height: height,
        alignItems: "center",
        flex: 1
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
});

export default ImageSwiper;
