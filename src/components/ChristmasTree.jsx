import { useRef } from 'react'
import LEDLights from './LEDLights'
import Letter from './Letter'

function ChristmasTree({ onLetterClick, clickedLetters }) {
  const treeRef = useRef()

  // Sample letter data - can be replaced with actual content later
  const letters = [
    { id: 1, title: 'Letter 1', content: `Gửi bé,

Cảm ơn em đã bước vào cuộc sống và thêm màu sắc vào những ngày vốn đỗi bình thường của chị trở nên sặc sỡ và trọn vẹn hơn vì có sự hiện diện của em ☺️

Năm nay chưa bao giờ là một năm dễ dàng với chị, nhưng em lại xuất hiện như một món quà vô cùng quý giá, em là món quà đẹp nhất mà năm 2025 đã dành riêng cho chị (và cả những năm tháng sau này 😉).

Có những lúc chị mệt mỏi, hoang mang và tưởng chừng như chẳng còn nhiều năng lượng để bước tiếp, nhưng chỉ cần nghĩ đến em, chị lại thấy lòng mình dịu xuống và an yên.

Em đến rất tự nhiên, không hứa hẹn điều gì quá lớn lao, chỉ lặng lẽ ở bên cạnh, vậy mà lại trở thành chỗ dựa tinh thần mà chị trân trọng và khiến chị đủ vững vàng để đối diện với tất cả.

Chị trân trọng từng khoảnh khắc có em bên cạnh, dù là những câu chuyện rất nhỏ, những lần im lặng rất lâu, hay chỉ đơn giản là cảm giác biết rằng có một người đang hiện diện và quan tâm. Với chị, như vậy đã là rất nhiều rồi.

Chị biết mỗi người đều mang theo những câu chuyện riêng, những áp lực và tổn thương chưa kịp gọi tên. Vì thế, chị càng quý việc chúng mình chọn ở lại bên nhau bằng sự thấu hiểu và tôn trọng, không vội vàng, không ép buộc, chỉ đủ chân thành để cảm thấy tin tưởng.

Mong rằng những ngày sắp tới, dù vui hay buồn, chúng mình vẫn có thể đi cùng nhau bằng sự chân thành và ấm áp như thế này, dù là chậm rãi thôi, nhưng đủ để cảm nhận.

Chị thương em nhiều lắm ❤️`, position: [0, 0, 0] },
    { id: 2, title: 'Letter 2', content: `Gửi em bé,

Khi chúng mình chính thức gọi tên mối quan hệ này, chị nhận ra trong lòng mình có một cảm giác rất lạ, vừa bình yên, vừa hạnh phúc. Không phải vì mọi thứ bỗng trở nên hoàn hảo, mà vì chị biết mình đã chọn ở bên một người khiến chị muốn dịu dàng hơn với thế giới này.

Chị hiểu em là người quen giữ mọi thứ cho riêng mình. Có lẽ vì em không muốn ai phải lo, hoặc vì có những điều em vẫn đang tự mình sắp xếp. Chị tôn trọng điều đó, thật lòng. Chị không mong em phải thay đổi, cũng không cần em phải nói ra tất cả ngay lập tức. Chỉ là, từ khi chúng mình bước vào mối quan hệ này, chị mong em biết rằng: em không còn phải một mình nữa.

Vì chúng mình ở xa nhau, nên chị không thể ở cạnh em mỗi khi em mệt, không thể nhìn thấy nét mặt em để biết hôm nay em ổn hay không. Chính vì vậy, chị càng mong được ở gần em theo một cách khác - là được biết em đang nghĩ gì, đang trải qua điều gì, dù chỉ là những chuyện rất nhỏ trong một ngày bình thường.

Em đừng ngại chia sẻ với chị nhé. Không cần phải là những câu chuyện lớn lao hay những nỗi buồn khó gọi tên. Có thể chỉ là hôm nay em mệt, hay hôm nay em chẳng có tâm trạng gì cả. Kể cho chị nghe một ngày của em trôi qua thế nào cũng được. Em quan tâm và lo cho chị, thì chị cũng mong được lo cho em theo cách nhẹ nhàng như vậy.

Chị luôn sẵn sàng nghe em nói. Không cần phải sợ bị đánh giá, cũng không cần phải suy nghĩ xem nên nói thế nào cho đúng. Chị chỉ muốn em biết là em không phải tự ôm mọi thứ một mình, và nếu em muốn, chị luôn ở đây - bên cạnh em ☺️

Chúng mình mới bắt đầu thôi, không cần vội vàng. Chỉ cần cùng nhau đi chậm, đủ thật, đủ ấm. Với chị, như vậy đã là rất đáng quý rồi. Và vì chị vẫn muốn đi xa hơn cùng em, dù không rõ tương lai sẽ như nào, nhưng trong thâm tâm chị luôn muốn sẽ đi đến cuối con đường cùng với em 🥺

Chị thương em nhiều lắm ❤️`, position: [0, 0, 0] },
    { id: 3, title: 'Letter 3', content: `Gửi bé iu,

Có những lúc chị thấy thật dễ thương khi nghĩ về việc: giữa rất nhiều người, rất nhiều ngày trôi qua, tụi mình lại chọn dừng lại ở nhau. Không phải vì điều gì quá đặc biệt, mà chỉ vì ở cạnh em, mọi thứ tự nhiên thấy nhẹ hơn một chút.

Chị thích cách em bước vào cuộc sống của chị rất bình thản. Không ồn ào, không phô trương, chỉ là đủ để chị mỉm cười khi thấy tin nhắn của em, đủ để một ngày dài kết thúc bằng cảm giác dễ chịu. Nhiều khi chẳng cần nói gì nhiều, chỉ biết là có em ở đó thôi cũng đã thấy ổn rồi.

Chị mong những ngày sắp tới của tụi mình sẽ có thật nhiều điều đáng yêu như vậy. Là những câu chuyện vu vơ, những lần hỏi han rất khẽ, những khoảnh khắc chẳng có gì to tát nhưng lại khiến mình nhớ lâu. Không cần lúc nào cũng vui, chỉ cần là thật và tử tế với nhau.

Nếu có ngày nào đó em mệt, chị hy vọng sự hiện diện của chị, dù chỉ qua vài dòng tin nhắn, cũng đủ để em thấy được quan tâm. Và nếu có ngày em vui, chị cũng rất muốn được nghe, để vui cùng em một chút.

Cứ từ từ thôi em nhé. Mình không cần đi nhanh, chỉ cần đi cùng nhau bằng sự dịu dàng mà tụi mình đang có 🥰

Chị yêu em 💞`, position: [0, 0, 0] },
    { id: 4, title: 'Letter 4', content: `Gửi em,

Có lẽ điều chị thấy quý nhất ở tụi mình là quãng thời gian đã đi cùng nhau trước khi gọi tên mối quan hệ này. Hai năm làm bạn, rồi thêm nửa năm tìm hiểu và theo đuổi - từng khoảng thời gian đó không hề dư thừa. Nhờ vậy mà chị hiểu em hơn một chút, hiểu cách em nghĩ, cách em im lặng, cả những điều em không nói ra nhưng vẫn thể hiện bằng cách riêng của mình.

Và cũng nhờ em, chị học được cách chậm lại. Trước đây chị hay vội - vội trong cảm xúc, vội trong mong đợi, đôi khi còn vội cả với chính mình. Nhưng khi ở cạnh em, chị dần quen với việc kiên nhẫn hơn, biết chờ đợi, biết để mọi thứ diễn ra đúng nhịp của nó. Không phải vì bị ép, mà vì chị thấy điều đó là xứng đáng.

Chị trân trọng việc tụi mình đã không đi đường tắt. Mọi thứ đến một cách từ từ, đủ lâu để hiểu, đủ sâu để tin. Nên khi hôm nay tụi mình chọn ở bên nhau, với chị, đó không phải là sự bốc đồng, mà là một lựa chọn rất rõ ràng và bình yên.

Có thể tụi mình vẫn còn nhiều điều phải học cùng nhau, vẫn còn những lúc chưa thật sự hiểu hết. Nhưng chị tin nền tảng mà tụi mình có - sự quen thuộc, sự kiên nhẫn và sự tôn trọng - sẽ đủ để mình đi tiếp mà không cần vội vàng.

Cảm ơn em, vì đã ở đó suốt quãng đường vừa qua, và vì đã vô tình dạy chị cách dịu dàng hơn với thời gian, với cảm xúc, và với chính mối quan hệ này.

Chị cảm ơn bé đã bước vào cuộc sống của chị 💝`, position: [0, 0, 0] },
    { id: 5, title: 'Letter 5', content: `Bé yêu của chị,

Chị muốn gửi đến em những lời chúc tốt đẹp nhất trong mùa Giáng sinh này. Mong rằng em sẽ luôn cảm thấy ấm áp và hạnh phúc, dù cho cuộc sống có đôi lúc mang đến những thử thách và khó khăn.

Chị biết rằng em là người rất mạnh mẽ và kiên cường, nhưng cũng đừng quên rằng em xứng đáng được yêu thương và chăm sóc. Hãy dành thời gian để quan tâm đến bản thân mình, để làm những điều mà em yêu thích và mang lại niềm vui cho chính mình.

Chị hy vọng rằng trong năm mới sắp tới, em sẽ đạt được những mục tiêu mà mình đã đặt ra, và có thêm nhiều trải nghiệm đáng nhớ. Dù có chuyện gì xảy ra, hãy nhớ rằng chị luôn ở đây, sẵn sàng lắng nghe và chia sẻ cùng em.

Mong rằng chúng mình sẽ có thêm nhiều kỷ niệm đẹp bên nhau trong thời gian tới. Chị rất trân trọng tình cảm mà chúng mình đang xây dựng, và mong rằng nó sẽ ngày càng bền chặt hơn theo thời gian.

Chúc em một mùa Giáng sinh an lành và một năm mới tràn đầy niềm vui và thành công.

Yêu em nhiều lắm ❤️`, position: [0, 0, 0] },
    { id: 6, title: 'Letter 6', content: `Bé yêu,

Chị thích những khoảnh khắc yên tĩnh mà hai đứa mình có được bên nhau.

Không phải lúc nào chúng mình cũng cần phải nói nhiều, không phải lúc nào cũng cần phải làm những điều đặc biệt. Đôi khi chỉ cần biết rằng có một người đang ở đó, đang quan tâm và suy nghĩ về mình, là đã đủ ấm lòng rồi.

Chị nhớ những lần hai đứa mình cùng nhau chia sẻ những câu chuyện về ngày của mình, về những điều nhỏ nhặt trong cuộc sống. Với người khác, có thể đó là những điều tầm thường, nhưng với chị, đó là những kỷ niệm quý giá.

Mỗi khoảnh khắc như vậy đều khiến chị cảm thấy gần gũi với em hơn, hiểu em hơn, và yêu em nhiều hơn. Chúng là những mảnh ghép nhỏ tạo nên bức tranh lớn về tình cảm mà chị dành cho em.

Chị mong rằng sẽ còn có thêm nhiều khoảnh khắc như vậy nữa, dù là những việc rất đơn giản, nhưng đủ để chúng mình cảm thấy hạnh phúc và trọn vẹn.

Bởi vì với chị, có em là đã có tất cả rồi.

Thương em ❤️`, position: [0, 0, 0] },
    { id: 7, title: 'Letter 7', content: `Em của chị,

Khi nghĩ về tương lai, chị không hề biết trước được điều gì sẽ xảy ra. Cuộc sống luôn đầy bất ngờ, có những điều tốt đẹp và cả những thử thách.

Nhưng có một điều chị chắc chắn: chị muốn em ở trong tương lai đó của chị.

Chị không hứa hẹn rằng mọi thứ sẽ luôn hoàn hảo, bởi vì chị biết rằng không có mối quan hệ nào là hoàn hảo cả. Sẽ có những lúc chúng mình bất đồng, có những lúc chúng mình mệt mỏi và cần thời gian riêng.

Nhưng chị hứa rằng, chị sẽ luôn cố gắng hết sức để thấu hiểu em, để lắng nghe em, và để cùng em vượt qua mọi khó khăn. Chị muốn chúng mình xây dựng một mối quan hệ dựa trên sự tin tưởng, tôn trọng và yêu thương chân thành.

Chị mong rằng em cũng cảm nhận được điều đó, và sẵn sàng cùng chị đi trên con đường này, dù nó có thể không phẳng lặng, nhưng chắc chắn sẽ đáng giá.

Vì chị tin rằng, bên cạnh em, chị có thể trở thành phiên bản tốt nhất của chính mình.

Chị yêu em ❤️`, position: [0, 0, 0] },
    { id: 8, title: 'Letter 8', content: `Gửi em,

Mùa Giáng sinh này, điều chị mong ước nhất không phải là những món quà đắt tiền hay những điều xa xỉ, mà đơn giản chỉ là được thấy em hạnh phúc và bình an.

Chị mong em luôn giữ được nụ cười ấy, luôn giữ được sự lạc quan và yêu đời của mình. Đó là những điều làm em trở nên đặc biệt trong mắt chị.

Chị mong em biết rằng, dù cuộc sống có khó khăn thế nào, em luôn có một người đang ở đây, sẵn sàng đỡ đần và chia sẻ với em. Em không bao giờ phải đối mặt với mọi thứ một mình cả.

Chị cũng mong rằng trong những ngày lễ này, chúng mình sẽ có thêm nhiều kỷ niệm đẹp bên nhau, dù chỉ là những điều giản dị như cùng nhau xem phim, cùng nhau đi dạo, hay đơn giản chỉ là trò chuyện suốt đêm.

Mỗi khoảnh khắc bên em đều quý giá với chị, và chị muốn trân trọng từng giây từng phút đó.

Chúc em một mùa lễ thật ấm áp và tràn đầy yêu thương.

Yêu em nhiều ❤️`, position: [0, 0, 0] },
    { id: 9, title: 'Letter 9', content: `Bé yêu của chị,

Đôi khi chị nghĩ, có lẽ lời nói không thể nào diễn tả hết được những cảm xúc mà chị dành cho em. Nhưng chị vẫn muốn cố gắng, để em biết rằng em đã quan trọng với chị đến như thế nào.

Em là người làm cho những ngày buồn của chị trở nên dễ chịu hơn, là người làm cho những ngày vui của chị trở nên rực rỡ hơn. Em là lý do khiến chị mỉm cười giữa những lúc mệt mỏi nhất.

Chị trân trọng mọi thứ về em - cả những ưu điểm lẫn những khuyết điểm. Bởi vì tất cả những điều đó kết hợp lại mới tạo nên con người em, người mà chị yêu quý và quan tâm.

Chị muốn em biết rằng, dù có chuyện gì xảy ra, dù em có cảm thấy như mình không đủ tốt hay không xứng đáng, thì với chị, em luôn là một người rất đặc biệt.

Em xứng đáng nhận được tất cả những điều tốt đẹp nhất trong cuộc sống này, và nếu có thể, chị muốn là người mang đến cho em những điều đó.

Cảm ơn em đã có mặt trong cuộc đời chị.

Thương em rất nhiều ❤️`, position: [0, 0, 0] },
    { id: 10, title: 'Letter 10', content: `Gửi em yêu quý,

Đây là lá thư cuối cùng trong những lá thư mà chị muốn gửi đến em trong mùa Giáng sinh này. Nhưng chị muốn em biết rằng, tình cảm của chị dành cho em sẽ không dừng lại ở đây.

Mỗi ngày trôi qua, chị lại càng trân trọng em hơn, càng hiểu được giá trị của sự hiện diện của em trong cuộc sống mình. Em không chỉ là một phần của hiện tại, mà còn là một phần quan trọng trong tương lai mà chị hằng mong ước.

Chị muốn cùng em trải qua thêm nhiều mùa lễ, nhiều khoảnh khắc đáng nhớ nữa. Chị muốn tiếp tục tìm hiểu em, khám phá những câu chuyện mới về em, và xây dựng thêm nhiều kỷ niệm đẹp bên nhau.

Dù tương lai có mang đến điều gì, chị hy vọng chúng mình sẽ luôn giữ được sự chân thành, tôn trọng và yêu thương như hiện tại. Đó là nền tảng để chúng mình có thể vượt qua mọi thử thách và cùng nhau tiến về phía trước.

Cảm ơn em vì tất cả. Cảm ơn em vì đã là chính mình. Và cảm ơn em vì đã cho chị cơ hội được yêu thương và được yêu thương lại.

Chị yêu em rất nhiều, và sẽ luôn yêu em.

Mãi mãi bên em ❤️`, position: [0, 0, 0] },
  ]

  return (
    <group ref={treeRef} position={[0, -0.5, 0]}>
      {/* Tree Trunk */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.8, 16]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>

      {/* Tree Body - Multiple cone layers for realistic look */}
      <group position={[0, 0.7, 0]}>
        {/* Bottom layer */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <coneGeometry args={[2, 2, 32]} />
          <meshStandardMaterial color="#0d5c0d" roughness={0.8} />
        </mesh>

        {/* Middle layer */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <coneGeometry args={[1.5, 1.8, 32]} />
          <meshStandardMaterial color="#0f6b0f" roughness={0.8} />
        </mesh>

        {/* Top layer */}
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <coneGeometry args={[1, 1.5, 32]} />
          <meshStandardMaterial color="#118c11" roughness={0.8} />
        </mesh>

        {/* Tree Star */}
        <mesh position={[0, 3.5, 0]}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* LED Lights wrapped around the tree */}
      <LEDLights />

      {/* Letters hanging from the tree */}
      {letters.map((letter, index) => {
        const angle = (index / letters.length) * Math.PI * 2
        const height = 1.2 + (index % 3) * 0.8
        const radius = 1.5 - (height - 1.2) * 0.3
        return (
          <Letter
            key={letter.id}
            letter={letter}
            position={[
              Math.cos(angle) * radius,
              height,
              Math.sin(angle) * radius
            ]}
            number={index + 1}
            onClick={() => onLetterClick(letter)}
            isClicked={clickedLetters.has(letter.id)}
          />
        )
      })}
    </group>
  )
}

export default ChristmasTree
