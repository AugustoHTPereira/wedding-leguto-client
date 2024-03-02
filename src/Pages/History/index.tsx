import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import HomeNavbar from '../Home/components/HomeNavbar';
import useWeddingDate from '../../Hooks/useWeddingDate';

const History = () => {
    const { diff: { d: days } } = useWeddingDate();

    return (
        <Box
            w='full'
            minH='100vh'
        >
            <HomeNavbar theme='light' />

            <Box px='6'>
                <Box
                    w='full'
                    maxW='container.sm'
                    mx='auto'
                    pt='20'
                    pb='16'
                >
                    <Box
                        mb='12'
                    >
                        <Text
                            textAlign='center'
                            fontSize='4xl'
                            fontWeight='bold'
                            mb='6'
                        >
                            Nossa história
                        </Text>

                        <Text
                            textAlign='center'
                            maxW='md'
                            mx='auto'
                            fontSize='xl'
                        >
                            Gostaríamos de compartilhar com você, nosso convidado, um pouco da nossa história.
                        </Text>
                    </Box>

                    <Box color='gray.800' fontSize='xl'>
                        <Text mb='4' as='p'>Olá a todos,</Text>

                        <Text mb='4' as='p'>É um prazer recebê-los em nosso cantinho virtual, onde queremos compartilhar um pouco da jornada que nos trouxe até este momento tão especial - o nosso casamento!</Text>

                        <Text mb='4' as='p'>Tudo começou em 2016, quando conheci Camila. Ela era uma menina pura e sonhadora, e inicialmente éramos apenas amigos. Conversávamos diariamente, mas nunca imaginei que esse relacionamento evoluiria para algo tão significativo como é hoje.</Text>

                        <Text mb='4' as='p'>Naquela época, eu estava no auge da adolescência, vivendo uma vida um tanto quanto desregrada. Festas, bebidas e uma crença distante em Deus dominavam meus dias. Por outro lado, Camila era alguém que buscava a pureza e a espiritualidade. Apesar de ser mais nova, ela tinha uma maturidade que eu admirava profundamente.</Text>

                        <Text mb='4' as='p'>Foi nessa atmosfera de maturidade que, mesmo sendo apenas amigos, Camila começou a me dar conselhos, a me guiar e a me mostrar um caminho diferente. Sem perceber, fui me apaixonando por ela aos poucos. Com o tempo, nossas conversas se tornaram mais profundas e os laços que nos uniam se fortaleceram até que, em um momento especial durante a minha formatura, demos um passo além e ficamos juntos. A partir daí, foi como se uma explosão de sentimentos tomasse conta de nós.</Text>

                        <Text mb='4' as='p'>Desde então, nossos dias foram preenchidos com risadas, longas conversas e aventuras que nos levaram a descobrir o verdadeiro significado do amor e da parceria. Juntos, enfrentamos desafios que nos fizeram crescer individualmente e como casal, e aprendemos que, com amor e apoio mútuo, somos capazes de superar qualquer obstáculo que a vida nos apresente.</Text>

                        <Text mb='4' as='p'>Essa frase já se tornou um lema em nosso relacionamento: "Costumo dizer que existe um Guilherme antes e um depois da Camila". E isso reflete a verdade sobre nossa jornada juntos. Camila não apenas trouxe amor à minha vida, mas também uma profunda transformação. Evoluímos juntos, não apenas como casal, mas também como indivíduos. Seja na vida pessoal, espiritual ou profissional, nossa parceria nos fortaleceu de maneiras inimagináveis. Encontramos não apenas amor um pelo outro, mas também conforto, confiança e carinho mútuo, tornando nossa jornada verdadeiramente especial e significativa.</Text>

                        <Text mb='4' as='p'>Então, depois de um namoro incrível, chegou a hora do pedido de casamento. Em um lugar romântico, cercado de pessoas que amamos, ele ajoelhou-se e, com o coração cheio de amor, fez a pergunta que mudaria nossas vidas para sempre. Foi um momento de pura felicidade e emoção, e mal podemos esperar para compartilhar essa alegria com todos vocês no dia do nosso casamento.</Text>

                        <Text mb='4' as='p'>À medida que nos preparamos para embarcar nesta nova fase de nossas vidas juntos, estamos cheios de esperança, sonhos e planos para o futuro. Mal podemos esperar para construir uma vida cheia de amor, aventuras e momentos inesquecíveis ao lado de cada um de vocês.</Text>

                        <Text mb='4' as='p'>Não podemos concluir sem expressar nossa profunda gratidão aos nossos pais. Seu amor incondicional, apoio e orientação ao longo dos anos foram fundamentais para moldar quem somos hoje e para nos preparar para este momento. Agradecemos por tudo que fizeram e por estarem ao nosso lado, não apenas como pais, mas como nossos maiores exemplos de amor e dedicação.</Text>

                        <Text mb='4' as='p'>A todos vocês que fazem parte desta jornada conosco, muito obrigado por compartilharem conosco este momento único e especial em nossas vidas.</Text>

                        <Text mb='4' as='p'>Com amor, Camila e Guilherme.</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default History;