/**
 * Created by E20444 on 6/22/15.
 */
var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                Hello, world! I am a CommentBox.
                <div>
                    What The Actual FUck?
                </div>
            </div>
        );
    }
});
React.render(
    <CommentBox />,
    document.getElementById('resurection')
);

alert("I am Connected");