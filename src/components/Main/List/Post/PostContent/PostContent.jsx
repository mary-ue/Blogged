import {useState} from 'react';
import style from './PostContent.module.css';
import PropTypes from 'prop-types';
import {Text} from '../../../../../UI/Text';
import Modal from '../../../../Modal';

export const PostContent = ({title, author, id}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   console.log('PostContent rendered');
  // }, []);

  return (
    <div className={style.content}>
      <Text As="h2" className={style.title}>
        <Text
          As="a"
          size={14}
          tsize={22}
          className={style.linkPost}
          href="#post"
          onClickFn={() => {
            setIsModalOpen(true);
          }}
        >
          {title}
        </Text>
      </Text>
      <Text
        className={style.linkAuthor}
        href="#author"
        As="a"
        color="orange"
        size={12}
        tsize={14}
      >
        {author}
      </Text>
      {isModalOpen &&
        <Modal
          id={id}
          closeModal={() => setIsModalOpen(false)}
        />}
    </div>
  );
};

PostContent.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  id: PropTypes.string,
};
