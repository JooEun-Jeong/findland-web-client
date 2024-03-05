import React from 'react';

import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { RectangleSpec } from '@interfaces';

import { ArticleContentWrapper, ArticleHeader, ArticleTitleTypo } from './styled';

interface ArticleProps extends RectangleSpec {
  title: string;
  content: string;
  videoUrl: string;
}

function Aritcle({ width, height, title, content, videoUrl }: ArticleProps) {
  return (
    <Card sx={{ width: width, height: height }}>
      <CardMedia component="iframe" sx={{ height: 120 }} src={videoUrl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export const Ariticles = (props: RectangleSpec) => {
  return (
    <>
      <Box sx={{ width: props.width, height: props.height }}>
        <Box>
          <ArticleHeader width={props.width}>
            <ArticleTitleTypo>토지조사부로 조상땅찾기</ArticleTitleTypo>
          </ArticleHeader>
          <Box sx={{ marginTop: '25px' }}>
            <ArticleContentWrapper>
              <Aritcle
                width={280}
                height={291}
                title="조상땅 찾는 방법"
                content="땅을 찾기 위한 9가지 구체적인 방법을 소개드립니다."
                videoUrl="https://www.youtube.com/embed/ikqZvjOWqTo"
              />
              <Aritcle
                width={280}
                height={291}
                title="조상땅찾기 성공 사례"
                content="조상땅을 찾는데 성공한 방법과 사례에 대해 소개드립니다."
                videoUrl="https://www.youtube.com/embed/5hmh6HSnhXE"
              />
            </ArticleContentWrapper>
          </Box>
        </Box>
        <ArticleContentWrapper className="lower">
          <ArticleHeader width={`calc(52% - 30px)`}>
            <ArticleTitleTypo className="lower">관련 판례</ArticleTitleTypo>
            <Aritcle
              width={'100%'}
              height={291}
              title="조상땅찾기 관련 판례 "
              content="조상의 땅을 되찾은 판례를 소개드립니다."
              videoUrl="https://eju8121.tistory.com/1265"
            />
          </ArticleHeader>
          <ArticleHeader width={`calc(52% - 30px)`}>
            <ArticleTitleTypo className="lower">관련 언론보도</ArticleTitleTypo>
            <Aritcle
              width={'100%'}
              height={291}
              title="조상땅 찾는 방법"
              content="땅을 찾기 위한 9가지 구체적인 방법을 소개드립니다."
              videoUrl="https://www.youtube.com/watch?v=ikqZvjOWqTo"
            />
          </ArticleHeader>
        </ArticleContentWrapper>
      </Box>
    </>
  );
};
