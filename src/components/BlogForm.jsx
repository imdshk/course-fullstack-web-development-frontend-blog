const BlogForm = ({ onSubmit, title, author, url, onTitleChange, onAuthorChange, onUrlChange }) => {
    return(
        <form onSubmit={onSubmit}>
            <div>
            title:
            <input 
                value={title}
                onChange={onTitleChange}
                type="text"
            />
            </div>
            <div>
            author:
            <input 
                value={author}
                onChange={onAuthorChange}
                type="text"
            />
            </div>
            <div>
            url:
            <input 
                value={url}
                onChange={onUrlChange}
                type="text"
            />
            </div>
            <button type="submit">
                create
            </button>
        </form>
    )
}

export default BlogForm