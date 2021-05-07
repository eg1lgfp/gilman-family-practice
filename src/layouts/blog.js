import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {Layout} from '../components/index';
import {toStyleObj, withPrefix, getPages, Link} from '../utils';

export default class Blog extends React.Component {
    render() {
        let display_posts = _.orderBy(getPages(this.props.pages, '/blog'), 'frontmatter.date', 'desc');
        return (
            <Layout {...this.props}>
              <header className="page-header has-gradient outer">
                {_.get(this.props, 'page.frontmatter.image', null) && (
                <div className="bg-img" style={toStyleObj('background-image: url(\'' + withPrefix(_.get(this.props, 'page.frontmatter.image', null)) + '\')')}/>
                )}
                <div className="inner-sm">
                  <h1 className="page-title">{_.get(this.props, 'page.frontmatter.title', null)}</h1>
                  {_.get(this.props, 'page.frontmatter.subtitle', null) && (
                  <p className="page-subtitle">{_.get(this.props, 'page.frontmatter.subtitle', null)}</p>
                  )}
                </div>
              </header>
              <div className="inner-md outer">
                <div className="post-feed">
                  {_.map(display_posts, (post, post_idx) => (
                  <article key={post_idx} className="post">
                    {_.get(post, 'frontmatter.thumb_image', null) && (
                    <Link className="post-thumbnail" href={withPrefix(_.get(post, '__metadata.urlPath', null))}><img src={withPrefix(_.get(post, 'frontmatter.thumb_image', null))} alt={_.get(this.props, 'page.frontmatter.thumb_image_alt', null)} /></Link>
                    )}
                    <header className="post-header">
                      <div className="post-meta">
                        <time className="published" dateTime={moment(_.get(post, 'frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'frontmatter.date', null)).strftime('%B %d, %Y')}</time>
                      </div>
                      <h2 className="post-title line-left"><Link href={withPrefix(_.get(post, '__metadata.urlPath', null))} rel="bookmark">{_.get(post, 'frontmatter.title', null)}</Link></h2>
                    </header>
                    {_.get(post, 'frontmatter.excerpt', null) && (<React.Fragment>
                        <p className="post-excerpt">{_.get(post, 'frontmatter.excerpt', null)}</p>
                        {((_.get(this.props, 'page.frontmatter.has_more_link', null) === true) && _.get(this.props, 'page.frontmatter.more_link_text', null)) && (
                        <p className="read-more">
                          <Link className="read-more-link" href={withPrefix(_.get(post, '__metadata.urlPath', null))}>{_.get(this.props, 'page.frontmatter.more_link_text', null)}</Link>
                        </p>
                        )}
                    </React.Fragment>)}
                  </article>
                ))}
                </div>
              </div>
            </Layout>
        );
    }
}
